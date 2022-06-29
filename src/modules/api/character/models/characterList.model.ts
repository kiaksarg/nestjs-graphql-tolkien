import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Character } from './character.model';

@ObjectType({ isAbstract: true })
class PaginatedCharacterList {
  @Field(() => [Character], { nullable: 'itemsAndList' })
  items: Character[];
  @Field(() => Int)
  totalItems: number;
}

@ObjectType()
export class CharacterList extends PaginatedCharacterList {}
