import { BattleService } from '@modules/battles/service/battle.service';
import { NotFoundException } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { RequestContext } from '../common/request-context';
import { Ctx } from '../decorators/request-context.decorator';
import { BattleListQueryOption } from './battle.args';
import { Battle } from './models/battle.model';
import { BattleList } from './models/battleList.model';

@Resolver(() => Battle)
export class BattleResolver {
  constructor(private battleService: BattleService) {}

  @Query(() => Battle, { name: 'battle' })
  async getBattle(@Ctx() ctx: RequestContext, @Args('id', { type: () => ID }) id: bigint) {
    const battle = await this.battleService.get(ctx, id);

    if (!battle) {
      throw new NotFoundException(id);
    }
    return battle;
  }

  @Query(() => BattleList)
  async battles(@Ctx() ctx: RequestContext, @Args() args: BattleListQueryOption) {
    return this.battleService.findAll(ctx, args.options);
  }
}
