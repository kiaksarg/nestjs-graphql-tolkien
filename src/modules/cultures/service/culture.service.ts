import { ListQueryOptions } from '@common/common-types.interface.type';
import { characterPropertiesRelationMap } from '@modules/api/character/character.args';
import { PaginatedList } from '@modules/api/common/common.types';
import { RequestContext } from '@modules/api/common/request-context';
import { CharacterEntity } from '@modules/characters/entities/character.entity';
import { CharacterService } from '@modules/characters/service/character.service';
import { ListQueryBuilder } from '@modules/common/helpers/list-query-builder';
import { TransactionalConnection } from '@modules/common/services/transactional-connection';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsUtils } from 'typeorm';
import { CultureToCharacterEntity } from '../entities/culture-to-character.entity';
import { CultureEntity } from '../entities/culture.entity';

@Injectable()
export class CultureService {
  constructor(
    private connection: TransactionalConnection,
    private listQueryBuilder: ListQueryBuilder,
    private characterService: CharacterService,
  ) {}

  private readonly culToChEntityName = CultureToCharacterEntity.name.toLocaleLowerCase();
  private readonly relations = ['locations'];
  async get(ctx: RequestContext, id, charactersOptions = null): Promise<CultureEntity> {
    const cultureEntityName = CultureEntity.name.toLocaleLowerCase();

    const qb = this.connection
      .getRepository(ctx, CultureEntity)
      .createQueryBuilder(cultureEntityName);

    FindOptionsUtils.applyFindManyOptionsOrConditionsToQueryBuilder(qb, {
      relations: this.relations,
    });

    const culture = await qb.where(`${cultureEntityName}.id = :id`, { id }).getOne();

    if (!culture) throw new NotFoundException('Culture Not Found');

    if (!charactersOptions) return culture;

    const characterJoins = this.characterService.getCharacterJoins(this.culToChEntityName);

    const [items, totalItems] = await this.listQueryBuilder
      .build(CultureToCharacterEntity, charactersOptions.options, {
        ctx,
        where: { cultureId: culture.id },
        customPropertyMap: { ...characterPropertiesRelationMap },
        joins: characterJoins,
      })
      .getManyAndCount();

    (culture.characters as any) = { items: items.map((x) => x.character), totalItems };
    return culture;
  }

  findAll(
    ctx: RequestContext,
    options: ListQueryOptions<CultureEntity> | undefined,
    where: any = {},
  ): Promise<PaginatedList<CultureEntity>> {
    const extendedWhere = where;

    return this.listQueryBuilder
      .build(CultureEntity, options, {
        ctx,
        where: extendedWhere,
        relations: this.relations,
      })
      .getManyAndCount()
      .then(([items, totalItems]) => ({ items, totalItems }));
  }

  async pagedCultureCharactersByCultureId(ctx: RequestContext, cultureId, options): Promise<any> {
    const characterJoins = this.characterService.getCharacterJoins(this.culToChEntityName);

    return this.listQueryBuilder
      .build(CultureToCharacterEntity, options, {
        ctx,
        where: { cultureId },
        joins: characterJoins,
        customPropertyMap: { ...characterPropertiesRelationMap },
      })
      .getManyAndCount()
      .then(([items, totalItems]) => {
        return {
          items: items.map((x) => x.character),
          totalItems,
        };
      });
  }

  async pagedUnionCultureCharacters(
    ctx: RequestContext,
    options,
    charactersOptions: { options: ListQueryOptions<CharacterEntity> },
  ): Promise<any> {
    const [cultures, count] = await this.listQueryBuilder
      .build(CultureEntity, options, {
        ctx,
        relations: this.relations,
      })
      .getManyAndCount();

    if (cultures.length > 0) {
      const [cultureToCharacters, counts] = await this.characterService.getOtherEntitiesCharacters(
        ctx,
        CultureToCharacterEntity,
        charactersOptions,
        this.culToChEntityName,
        'cultureId',
        cultures,
      );

      cultures.forEach((culture, idx) => {
        (culture as any).characters = { items: [], totalItems: 0 };

        const characters =
          cultureToCharacters
            .filter((x) => x.cultureId === culture.id)
            .map((cToCh) => cToCh.character) ?? [];

        (culture as any).characters.items = characters;
        (culture as any).characters.totalItems = counts[idx].totalItems;
      });
    }

    return { items: cultures, totalItems: count };
  }
}
