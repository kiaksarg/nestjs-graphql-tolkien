import { GenderEnum } from '@common/constants';
import { Culture } from '@modules/api/culture/models/culture.model';
import { CultureList } from '@modules/api/culture/models/cultureList.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Character } from './character.model';

@ObjectType()
export class CultureToCharacter {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  cultureId: string;

  @Field(() => ID)
  characterId: string;

  @Field(() => Culture, { nullable: false })
  culture: Culture;

  @Field(() => Character, { nullable: false })
  character: Character;

  @Field()
  active: boolean;
}
