import { ListQueryOptions } from '@common/common-types.interface.type';
import { PaginatedList } from '@modules/api/common/common.types';
import { RequestContext } from '@modules/api/common/request-context';
import { ListQueryBuilder } from '@modules/common/helpers/list-query-builder';
import { TransactionalConnection } from '@modules/common/services/transactional-connection';
import { Injectable } from '@nestjs/common';
import { FindOptionsUtils } from 'typeorm';
import { ArtefactEntity } from '../entities/artefacts.entity';

@Injectable()
export class ArtefactService {
  constructor(
    private connection: TransactionalConnection,
    private listQueryBuilder: ListQueryBuilder,
  ) {}
  private readonly relations = ['characters', 'locations'];
  private readonly artefactEntityName = ArtefactEntity.name.toLocaleLowerCase();

  get(ctx: RequestContext, id): Promise<ArtefactEntity> {
    const qb = this.connection
      .getRepository(ctx, ArtefactEntity)
      .createQueryBuilder(this.artefactEntityName);

    FindOptionsUtils.applyFindManyOptionsOrConditionsToQueryBuilder(qb, {
      relations: this.relations,
    });

    // addJoinsToQueryBuilder(qb, this.joins);
    return qb.where(`${this.artefactEntityName}.id = :id`, { id }).getOne();
  }

  findAll(
    ctx: RequestContext,
    options: ListQueryOptions<ArtefactEntity> | undefined,
  ): Promise<PaginatedList<ArtefactEntity>> {
    const where = {};

    return this.listQueryBuilder
      .build(ArtefactEntity, options, {
        ctx,
        where: where,
        relations: this.relations,
      })
      .getManyAndCount()
      .then(([items, totalItems]) => ({ items, totalItems }));
  }
}
