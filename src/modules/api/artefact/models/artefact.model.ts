import { Character } from '@modules/api/character/models/character.model';
import { Location } from '@modules/api/location/models/location.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Artefact {
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

  @Field({ nullable: true })
  appearance!: string;

  @Field({ nullable: true })
  locationsText!: string;

  @Field(() => [Location], { nullable: 'itemsAndList' })
  locations!: Location[];

  @Field(() => [Character], { nullable: 'itemsAndList' })
  characters!: Character[];

  @Field({ nullable: true })
  otherNames!: string;

  @Field({ nullable: true })
  usage!: string;

  @Field()
  active: boolean;
}
