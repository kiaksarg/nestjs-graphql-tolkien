import {
  DateOperatorsInput,
  IdOperatorsInput,
  StringOperatorsInput,
} from './../common/common.types';
import { GenderEnum, SortOrderEnum } from '@common/constants';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ListQueryInput } from '../common/common.args';

@InputType()
export class CharacterFilterInput {
  @Field({ nullable: true })
  id: IdOperatorsInput;

  @Field({ nullable: true })
  active: boolean;

  @Field({ nullable: true })
  name: StringOperatorsInput;

  @Field({ nullable: true })
  lotrPageId: StringOperatorsInput;

  @Field({ nullable: true })
  text: StringOperatorsInput;

  @Field(() => GenderEnum, { nullable: true })
  gender: GenderEnum;

  @Field({ nullable: true })
  weapon: StringOperatorsInput;

  @Field({ nullable: true })
  birth: StringOperatorsInput;

  @Field({ nullable: true })
  death: StringOperatorsInput;

  @Field({ nullable: true })
  eyes: StringOperatorsInput;

  @Field({ nullable: true })
  hairColor: StringOperatorsInput;

  @Field({ nullable: true })
  height: StringOperatorsInput;

  @Field({ nullable: true })
  otherNames: StringOperatorsInput;

  @Field({ nullable: true })
  rule: StringOperatorsInput;

  @Field({ nullable: true })
  titles: StringOperatorsInput;
}

@InputType()
export class CharacterSortInput {
  @Field(() => SortOrderEnum, { nullable: true })
  id: SortOrderEnum;

  @Field(() => SortOrderEnum, { nullable: true })
  name: SortOrderEnum;

  @Field(() => DateOperatorsInput, { nullable: true })
  createdAt: DateOperatorsInput;

  @Field(() => DateOperatorsInput, { nullable: true })
  updatedAt: DateOperatorsInput;
}

@InputType()
export class CharacterListQueryInput extends ListQueryInput<
  CharacterSortInput,
  CharacterFilterInput
>(CharacterSortInput, CharacterFilterInput) {}

@ArgsType()
export class CharacterListQueryOption {
  @Field(() => CharacterListQueryInput, { nullable: false })
  options: CharacterListQueryInput;
}

export const characterPropertiesRelationMap = {
  id: 'characters.id',
  name: 'characters.name',
  lotrPageId: 'characters.lotrPageId',
  text: 'characters.text',
  gender: 'characters.gender',
  weapon: 'characters.weapon',
  birth: 'characters.birth',
  death: 'characters.death',
  eyes: 'characters.eyes',
  hairColor: 'characters.hairColor',
  height: 'characters.height',
  otherNames: 'characters.otherNames',
  rule: 'characters.rule',
  active: 'characters.active',
};
