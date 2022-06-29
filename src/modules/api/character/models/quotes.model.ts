import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Character } from './character.model';

@ObjectType()
export class Quote {
  @Field(() => ID)
  id: string;

  @Field({ nullable: false })
  text!: string;

  @Field({ nullable: false })
  source!: string;

  @Field(() => Character, { nullable: false })
  character: Character;

  @Field()
  active: boolean;
}
