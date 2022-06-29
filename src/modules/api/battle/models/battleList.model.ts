import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Battle } from './battle.model';

@ObjectType({ isAbstract: true })
class PaginatedBattleList {
  @Field(() => [Battle], { nullable: 'itemsAndList' })
  items: PaginatedBattleList[];
  @Field(() => Int)
  totalItems: number;
}

@ObjectType()
export class BattleList extends PaginatedBattleList {}
