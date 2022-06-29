import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Culture } from './culture.model';

@ObjectType({ isAbstract: true })
class PaginatedCultureList {
  @Field(() => [Culture], { nullable: 'itemsAndList' })
  items: PaginatedCultureList[];
  @Field(() => Int)
  totalItems: number;
}

@ObjectType()
export class CultureList extends PaginatedCultureList {}
