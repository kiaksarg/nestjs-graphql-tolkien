import { Artefact } from '@modules/api/artefact/models/artefact.model';
import { Battle } from '@modules/api/battle/models/battle.model';
import { Character } from '@modules/api/character/models/character.model';
import { CharacterList } from '@modules/api/character/models/characterList.model';
import { Culture } from '@modules/api/culture/models/culture.model';
import { Race } from '@modules/api/race/models/race.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Location {
  @Field(() => ID)
  id: string;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  text: string;

  @Field({ nullable: false })
  lotrPageId: string;

  @Field({ nullable: true })
  lotrUrl!: string;

  @Field({ nullable: true })
  capitalText!: string;

  @Field({ nullable: true })
  cultureText!: string;

  @Field({ nullable: true })
  description!: string;

  @Field({ nullable: true })
  events!: string;

  @Field({ nullable: true })
  foundedOrBuilt!: string;

  @Field({ nullable: true })
  governanceText!: string;

  @Field({ nullable: true })
  lifespan!: string;

  @Field({ nullable: true })
  majorTownsText!: string;

  @Field({ nullable: true })
  otherNames!: string;

  @Field({ nullable: true })
  position!: string;

  @Field({ nullable: true })
  regionsText!: string;

  @Field({ nullable: true })
  type!: string;

  // @Field(() => CultureList, { nullable: true })
  // cultures!: CultureList;
  @Field(() => [Culture], { nullable: 'itemsAndList' })
  cultures!: Culture[];

  @Field(() => CharacterList, { nullable: true })
  characters!: CharacterList;

  @Field(() => [Character], { nullable: 'itemsAndList' })
  governance!: Character[];

  @Field(() => [Location], { nullable: 'itemsAndList' })
  capitals!: Location[];

  @Field(() => [Location], { nullable: 'itemsAndList' })
  majorTowns!: Location[];

  @Field(() => [Location], { nullable: 'itemsAndList' })
  regions!: Location[];

  @Field(() => [Race], { nullable: 'itemsAndList' })
  races!: Race[];

  @Field(() => [Artefact], { nullable: 'itemsAndList' })
  artefacts!: Artefact[];

  @Field(() => [Battle], { nullable: 'itemsAndList' })
  battles!: Battle[];

  @Field()
  active: boolean;
}
