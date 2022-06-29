import { GenderEnum } from '@common/constants';
import { Artefact } from '@modules/api/artefact/models/artefact.model';
import { Culture } from '@modules/api/culture/models/culture.model';
import { Location } from '@modules/api/location/models/location.model';
import { Race } from '@modules/api/race/models/race.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Quote } from './quotes.model';

@ObjectType()
export class Character {
  @Field(() => ID)
  id: string;

  @Field({ nullable: false })
  name!: string;

  @Field({ nullable: false })
  text!: string;

  @Field({ nullable: false })
  lotrPageId!: string;

  @Field({ nullable: true })
  lotrUrl!: string;

  @Field(() => GenderEnum)
  gender: GenderEnum;

  @Field({ nullable: true })
  weapon!: string;

  @Field({ nullable: true })
  birth!: string;

  @Field({ nullable: true })
  death!: string;

  @Field({ nullable: true })
  eyes!: string;

  @Field({ nullable: true })
  hairColor!: string;

  @Field({ nullable: true })
  height!: string;

  @Field({ nullable: true })
  otherNames!: string;

  @Field({ nullable: true })
  rule!: string;

  @Field({ nullable: true })
  titles!: string;

  @Field(() => [Culture], { nullable: 'itemsAndList' })
  cultures: Culture[];

  @Field(() => [Character], { nullable: 'itemsAndList' })
  spouses: Character[];

  @Field(() => [Quote], { nullable: 'itemsAndList' })
  quotes: Quote[];

  @Field(() => [Race], { nullable: 'itemsAndList' })
  races: Race[];

  @Field(() => [Location], { nullable: 'itemsAndList' })
  locations: Location[];

  @Field(() => [Artefact], { nullable: 'itemsAndList' })
  artefacts!: Artefact[];

  @Field()
  active: boolean;
}
