import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Race } from './race.model';

@ObjectType({ isAbstract: true })
class PaginatedRaceList {
  @Field(() => [Race], { nullable: 'itemsAndList' })
  items: PaginatedRaceList[];
  @Field(() => Int)
  totalItems: number;
}

@ObjectType()
export class RaceList extends PaginatedRaceList {}
