import { ListQueryOptions } from '@common/common-types.interface.type';
import { PaginatedList } from '@modules/api/common/common.types';
import { RequestContext } from '@modules/api/common/request-context';
import { ListQueryBuilder } from '@modules/common/helpers/list-query-builder';
import { TransactionalConnection } from '@modules/common/services/transactional-connection';
import { Injectable } from '@nestjs/common';
import { FindOptionsUtils } from 'typeorm';
import { BattleEntity } from '../entities/battle.entity';

@Injectable()
export class BattleService {
  constructor(
    private connection: TransactionalConnection,
    private listQueryBuilder: ListQueryBuilder,
  ) {}
  private readonly relations = ['locations'];
  private readonly battleEntityName = BattleEntity.name.toLocaleLowerCase();

  get(ctx: RequestContext, id): Promise<BattleEntity> {
    const qb = this.connection
      .getRepository(ctx, BattleEntity)
      .createQueryBuilder(this.battleEntityName);

    FindOptionsUtils.applyFindManyOptionsOrConditionsToQueryBuilder(qb, {
      relations: this.relations,
    });

    // addJoinsToQueryBuilder(qb, this.joins);
    return qb.where(`${this.battleEntityName}.id = :id`, { id }).getOne();
  }

  findAll(
    ctx: RequestContext,
    options: ListQueryOptions<BattleEntity> | undefined,
  ): Promise<PaginatedList<BattleEntity>> {
    const where = {};

    return this.listQueryBuilder
      .build(BattleEntity, options, {
        ctx,
        where: where,
        relations: this.relations,
      })
      .getManyAndCount()
      .then(([items, totalItems]) => ({ items, totalItems }));
  }
}
