import { Injectable, NotFoundException } from '@nestjs/common';
import { ListQueryOptions } from '@common/common-types.interface.type';
import { PaginatedList } from '@modules/api/common/common.types';
import { RequestContext } from '@modules/api/common/request-context';
import { TransactionalConnection } from '@modules/common/services/transactional-connection';
import { ListQueryBuilder } from '@modules/common/helpers/list-query-builder';
import { LocationEntity } from '../entities/location.entity';
import { LocationToCharacterEntity } from '../entities/location-to-character.entity';
import { FindOptionsUtils } from 'typeorm';
import { characterPropertiesRelationMap } from '@modules/api/character/character.args';
import { CharacterService } from '@modules/characters/service/character.service';

@Injectable()
export class LocationService {
  constructor(
    private connection: TransactionalConnection,
    private listQueryBuilder: ListQueryBuilder,
    private characterService: CharacterService,
  ) {}

  private readonly locToChEntityName = LocationToCharacterEntity.name.toLocaleLowerCase();
  private readonly relations = [
    'cultures',
    'governance',
    'capitals',
    'majorTowns',
    'regions',
    'battles',
    'artefacts',
  ];
  async get(ctx: RequestContext, id, charactersOptions = null): Promise<LocationEntity> {
    const locationEntityName = LocationEntity.name.toLocaleLowerCase();

    const qb = this.connection
      .getRepository(ctx, LocationEntity)
      .createQueryBuilder(locationEntityName);

    FindOptionsUtils.applyFindManyOptionsOrConditionsToQueryBuilder(qb, {
      relations: this.relations,
    });

    const location = await qb.where(`${locationEntityName}.id = :id`, { id }).getOne();

    if (!location) throw new NotFoundException('Location Not Found');

    if (!charactersOptions) return location;
    const characterJoins = this.characterService.getCharacterJoins(this.locToChEntityName);

    const [items, totalItems] = await this.listQueryBuilder
      .build(LocationToCharacterEntity, charactersOptions.options, {
        ctx,
        where: { locationId: location.id },
        customPropertyMap: { ...characterPropertiesRelationMap },
        joins: characterJoins,
      })
      .getManyAndCount();

    (location.characters as any) = { items: items.map((x) => x.character), totalItems };
    return location;
  }

  findAll(
    ctx: RequestContext,
    options: ListQueryOptions<LocationEntity> | undefined,
  ): Promise<PaginatedList<LocationEntity>> {
    return this.listQueryBuilder
      .build(LocationEntity, options, {
        ctx,
        relations: this.relations,
      })
      .getManyAndCount()
      .then(([items, totalItems]) => ({ items, totalItems }));
  }

  async pagedUnionLocationCharacters(
    ctx: RequestContext,
    options,
    charactersOptions,
  ): Promise<any> {
    const [locations, count] = await this.listQueryBuilder
      .build(LocationEntity, options, {
        ctx,
        relations: this.relations,
      })
      .getManyAndCount();

    if (locations.length > 0) {
      const [locationToCharacters, counts] = await this.characterService.getOtherEntitiesCharacters(
        ctx,
        LocationToCharacterEntity,
        charactersOptions,
        this.locToChEntityName,
        'locationId',
        locations,
      );

      locations.forEach((location, idx) => {
        (location as any).characters = { items: [], totalItems: 0 };

        const characters =
          locationToCharacters
            .filter((x) => x.locationId === location.id)
            .map((cToCh) => cToCh.character) ?? [];

        (location as any).characters.items = characters;
        (location as any).characters.totalItems = counts[idx].totalItems;
      });
    }

    return { items: locations, totalItems: count };
  }
}
