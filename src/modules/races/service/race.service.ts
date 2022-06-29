import { ListQueryOptions } from '@common/common-types.interface.type';
import { characterPropertiesRelationMap } from '@modules/api/character/character.args';
import { PaginatedList } from '@modules/api/common/common.types';
import { RequestContext } from '@modules/api/common/request-context';
import { CharacterService } from '@modules/characters/service/character.service';
import { ListQueryBuilder } from '@modules/common/helpers/list-query-builder';
import { TransactionalConnection } from '@modules/common/services/transactional-connection';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsUtils } from 'typeorm';
import { RaceToCharacterEntity } from '../entities/race-to-character.entity';
import { RaceEntity } from '../entities/race.entity';

@Injectable()
export class RaceService {
  constructor(
    private connection: TransactionalConnection,
    private listQueryBuilder: ListQueryBuilder,
    private characterService: CharacterService,
  ) {}

  private readonly raceToChEntityName = RaceToCharacterEntity.name.toLocaleLowerCase();
  private readonly relations = ['locations'];

  async get(ctx: RequestContext, id, charactersOptions = null): Promise<RaceEntity> {
    const RaceEntityName = RaceEntity.name.toLocaleLowerCase();

    const qb = this.connection.getRepository(ctx, RaceEntity).createQueryBuilder(RaceEntityName);

    FindOptionsUtils.applyFindManyOptionsOrConditionsToQueryBuilder(qb, {
      relations: this.relations,
    });

    const race = await qb.where(`${RaceEntityName}.id = :id`, { id }).getOne();

    if (!race) throw new NotFoundException('Race Not Found');

    if (!charactersOptions) return race;
    const characterJoins = this.characterService.getCharacterJoins(this.raceToChEntityName);

    const [items, totalItems] = await this.listQueryBuilder
      .build(RaceToCharacterEntity, charactersOptions.options, {
        ctx,
        where: { raceId: race.id },
        customPropertyMap: { ...characterPropertiesRelationMap },
        joins: characterJoins,
      })
      .getManyAndCount();

    (race.characters as any) = { items: items.map((x) => x.character), totalItems };
    return race;
  }

  findAll(
    ctx: RequestContext,
    options: ListQueryOptions<RaceEntity> | undefined,
    where: any = {},
  ): Promise<PaginatedList<RaceEntity>> {
    const extendedWhere = where;

    return this.listQueryBuilder
      .build(RaceEntity, options, {
        ctx,
        where: extendedWhere,
        relations: this.relations,
      })
      .getManyAndCount()
      .then(([items, totalItems]) => ({ items, totalItems }));
  }

  async pagedRaceCharactersByRaceId(ctx: RequestContext, raceId, options): Promise<any> {
    return this.listQueryBuilder
      .build(RaceToCharacterEntity, options, {
        ctx,
        where: { raceId },
      })
      .getManyAndCount()
      .then(([items, totalItems]) => {
        return {
          items: items.map((x) => x.character),
          totalItems,
        };
      });
  }

  async pagedUnionRaceCharacters(ctx: RequestContext, options, charactersOptions): Promise<any> {
    const [races, count] = await this.listQueryBuilder
      .build(RaceEntity, options, {
        ctx,
        relations: this.relations,
      })
      .getManyAndCount();

    if (races.length > 0) {
      const [raceToCharacters, counts] = await this.characterService.getOtherEntitiesCharacters(
        ctx,
        RaceToCharacterEntity,
        charactersOptions,
        this.raceToChEntityName,
        'raceId',
        races,
      );

      races.forEach((race, idx) => {
        (race as any).characters = { items: [], totalItems: 0 };

        const characters =
          raceToCharacters.filter((x) => x.raceId === race.id).map((cToCh) => cToCh.character) ??
          [];

        (race as any).characters.items = characters;
        (race as any).characters.totalItems = counts[idx].totalItems;
      });
    }

    return { items: races, totalItems: count };
  }
}
