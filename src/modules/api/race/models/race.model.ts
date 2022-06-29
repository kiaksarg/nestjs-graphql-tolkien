import { CharacterList } from '@modules/api/character/models/characterList.model';
import { Location } from '@modules/api/location/models/location.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Race {
  @Field(() => ID)
  id: string;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  text: string;

  @Field({ nullable: false })
  lotrPageId!: string;

  @Field({ nullable: true })
  lotrUrl!: string;

  @Field({ nullable: true })
  charactersText!: string;

  @Field(() => CharacterList, { nullable: true })
  characters!: CharacterList;

  @Field({ nullable: true })
  distinctions!: string;

  @Field({ nullable: true })
  hairColor!: string;

  @Field({ nullable: true })
  height!: string;

  @Field({ nullable: true })
  languages!: string;

  @Field({ nullable: true })
  lifespan!: string;

  @Field({ nullable: true })
  otherNames!: string;

  @Field({ nullable: true })
  origins!: string;

  @Field({ nullable: true })
  skinColor!: string;

  @Field({ nullable: true })
  locationText!: string;

  @Field(() => [Location], { nullable: 'itemsAndList' })
  locations!: Location[];

  @Field()
  active: boolean;
}
