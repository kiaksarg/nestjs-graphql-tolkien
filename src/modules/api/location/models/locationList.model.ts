import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Location } from './location.model';

@ObjectType({ isAbstract: true })
class PaginatedLocationList {
  @Field(() => [Location], { nullable: 'itemsAndList' })
  items: PaginatedLocationList[];
  @Field(() => Int)
  totalItems: number;
}

@ObjectType()
export class LocationList extends PaginatedLocationList {}
