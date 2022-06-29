import { ListQueryOptions, Type } from '@common/common-types.interface.type';
import { characterPropertiesRelationMap } from '@modules/api/character/character.args';
import { PaginatedList } from '@modules/api/common/common.types';
import { RequestContext } from '@modules/api/common/request-context';
import { ArtefactEntity } from '@modules/artefacts/entities/artefacts.entity';
import { BaseEntity } from '@modules/common/entities';
import { ListQueryBuilder } from '@modules/common/helpers/list-query-builder';
import { TransactionalConnection } from '@modules/common/services/transactional-connection';
import { CultureToCharacterEntity } from '@modules/cultures/entities/culture-to-character.entity';
import { CultureEntity } from '@modules/cultures/entities/culture.entity';
import { LocationToCharacterEntity } from '@modules/locations/entities/location-to-character.entity';
import { LocationEntity } from '@modules/locations/entities/location.entity';
import { RaceToCharacterEntity } from '@modules/races/entities/race-to-character.entity';
import { RaceEntity } from '@modules/races/entities/race.entity';
import { Injectable } from '@nestjs/common';
import { addJoinsToQueryBuilder, JoinListType } from 'src/helpers/add-joins-to-query-builder';
import { getTakeSkipQuery } from 'src/helpers/get-take-skip-query';
import { unionAllQueries } from 'src/helpers/union-all-queries';
import { FindOptionsUtils } from 'typeorm';
import { CharacterEntity } from '../entities/character.entity';
import { QuoteEntity } from '../entities/quote.entity';

@Injectable()
export class CharacterService {
  constructor(
    private connection: TransactionalConnection,
    private listQueryBuilder: ListQueryBuilder,
  ) {}

  private readonly characterEntityName = CharacterEntity.name.toLocaleLowerCase();
  private readonly relations = ['spouses', 'quotes', 'artefacts'];
  private readonly joins: JoinListType[] = [
    {
      type: 'leftJoin',
      entity: CultureToCharacterEntity,
      alias: 'culture_to_character',
      condition: `culture_to_character.character_id = ${this.characterEntityName}.id`,
    },
    {
      type: 'leftJoinAndMapMany',
      mapToProperty: `${this.characterEntityName}.cultures`,
      entity: CultureEntity,
      alias: 'culture',
      condition: 'culture.id = culture_to_character.culture_id',
    },
    {
      type: 'leftJoin',
      entity: RaceToCharacterEntity,
      alias: 'race_to_character',
      condition: `race_to_character.character_id = ${this.characterEntityName}.id`,
    },
    {
      type: 'leftJoinAndMapMany',
      mapToProperty: `${this.characterEntityName}.races`,
      entity: RaceEntity,
      alias: 'race',
      condition: 'race.id = race_to_character.race_id',
    },
    {
      type: 'leftJoin',
      entity: LocationToCharacterEntity,
      alias: 'location_to_character',
      condition: `location_to_character.character_id = ${this.characterEntityName}.id`,
    },
    {
      type: 'leftJoinAndMapMany',
      mapToProperty: `${this.characterEntityName}.locations`,
      entity: LocationEntity,
      alias: 'location',
      condition: 'location.id = location_to_character.location_id',
    },
  ];

  get(ctx: RequestContext, id): Promise<CharacterEntity> {
    const qb = this.connection
      .getRepository(ctx, CharacterEntity)
      .createQueryBuilder(this.characterEntityName);

    FindOptionsUtils.applyFindManyOptionsOrConditionsToQueryBuilder(qb, {
      relations: this.relations,
    });

    addJoinsToQueryBuilder(qb, this.joins);
    return qb.where(`${this.characterEntityName}.id = :id`, { id }).getOne();
  }

  findAll(
    ctx: RequestContext,
    options: ListQueryOptions<CharacterEntity> | undefined,
  ): Promise<PaginatedList<CharacterEntity>> {
    const where = {};

    const qb = this.listQueryBuilder.build(CharacterEntity, options, {
      ctx,
      where: where,
      relations: this.relations,
    });

    addJoinsToQueryBuilder(qb, this.joins);

    return qb.getManyAndCount().then(([items, totalItems]) => ({ items, totalItems }));
  }

  getCharacterJoins(relationTableEntityName: string): JoinListType[] {
    return [
      {
        type: 'leftJoinAndSelect',
        property: `${relationTableEntityName}.character`,
        alias: 'character',
      },
      {
        type: 'leftJoinAndMapMany',
        mapToProperty: 'character.spouses',
        entity: CharacterEntity,
        alias: 'spouses',
        condition: 'character.spouse_id = spouses.id',
      },
      {
        type: 'leftJoinAndSelect',
        property: 'character.artefacts',
        entity: ArtefactEntity,
        alias: 'artefacts',
      },
      {
        type: 'leftJoinAndMapMany',
        mapToProperty: 'character.quotes',
        entity: QuoteEntity,
        alias: 'quotes',
        condition: 'character.id = quotes.character_id',
      },
      {
        type: 'leftJoin',
        entity: RaceToCharacterEntity,
        alias: 'race_to_character',
        condition: `race_to_character.character_id = character.id`,
      },
      {
        type: 'leftJoinAndMapMany',
        mapToProperty: `character.races`,
        entity: RaceEntity,
        alias: 'race',
        condition: 'race.id = race_to_character.race_id',
      },
      {
        type: 'leftJoin',
        entity: CultureToCharacterEntity,
        alias: 'culture_to_character',
        condition: 'character.id = culture_to_character.character_id',
      },
      {
        type: 'leftJoinAndMapMany',
        mapToProperty: 'character.cultures',
        entity: CultureEntity,
        alias: 'culture',
        condition: 'culture.id = culture_to_character.culture_id',
      },
      {
        type: 'leftJoin',
        entity: LocationToCharacterEntity,
        alias: 'location_to_character',
        condition: `location_to_character.character_id = character.id`,
      },
      {
        type: 'leftJoinAndMapMany',
        mapToProperty: `character.locations`,
        entity: LocationEntity,
        alias: 'location',
        condition: 'location.id = location_to_character.location_id',
      },
    ];
  }

  async getOtherEntitiesCharacters<T extends BaseEntity>(
    ctx: RequestContext,
    EntityClass: Type<T>,
    charactersOptions: { options: ListQueryOptions<T> },
    relationTableEntityName: string,
    entityIdKeyName: string,
    fetchedRecords,
  ): Promise<
    [
      T[],
      {
        totalItems: number;
      }[],
    ]
  > {
    const characterJoins = this.getCharacterJoins(relationTableEntityName);

    const qb = this.listQueryBuilder.build(EntityClass, charactersOptions.options, {
      ctx,
      where: { [entityIdKeyName]: -1 },
      customPropertyMap: { ...characterPropertiesRelationMap },
      joins: characterJoins,
    });

    const countQb = this.listQueryBuilder
      .build(EntityClass, charactersOptions.options, {
        ctx,
        where: { [entityIdKeyName]: -1 },
        customPropertyMap: { ...characterPropertiesRelationMap },
        joins: [
          {
            type: 'leftJoinAndSelect',
            property: `${relationTableEntityName}.character`,
            alias: 'character',
          },
        ],
      })
      .select(`COUNT(${relationTableEntityName}.id)`, 'totalItems');

    // 1 is cultureId or raceId etc. in where object
    const whereParametersCount = 1;

    const [countQuery] = countQb.getQueryAndParameters();

    const [takeSkipQuery, takeSkipParameter] = getTakeSkipQuery(
      qb,
      EntityClass,
      this.connection,
      charactersOptions.options,
    );

    const { allQueries: takeSkipAllQueries, parameters: takeSkipAllParameters } = unionAllQueries(
      takeSkipQuery,
      countQuery,
      takeSkipParameter,
      fetchedRecords,
      whereParametersCount,
    );

    const rawIds = await this.connection.rawConnection.manager.query(
      takeSkipAllQueries,
      takeSkipAllParameters,
    );
    const ids = Object.values(rawIds).map((x) => Object.values(x)[0]);
    let toCharacters = [];
    if (ids && ids?.length > 0)
      toCharacters = await this.listQueryBuilder
        .build(EntityClass, charactersOptions.options, {
          ctx,
          customPropertyMap: { ...characterPropertiesRelationMap },
          joins: characterJoins,
          takeSkip: false,
          offsetLimit: false,
        })
        .andWhere(`(${relationTableEntityName}.id IN (:...distinct_ids))`)
        .setParameter('distinct_ids', ids)
        .getMany();

    const [query, parameter] = qb.getQueryAndParameters();

    const { allCountQueries, parameters } = unionAllQueries(
      query,
      countQuery,
      parameter,
      fetchedRecords,
      whereParametersCount,
    );

    // const rawRes = await this.connection.rawConnection.manager.query(allQueries, parameters);

    const rawCountRes = await this.connection.rawConnection.manager.query(
      allCountQueries,
      parameters,
    );

    // const cultureToCharacters: CultureToCharacterEntity[] = await mapRawToEntity(
    //   this.connection.rawConnection,
    //   qb,
    //   rawRes,
    // );

    return [toCharacters, rawCountRes];
  }
}
