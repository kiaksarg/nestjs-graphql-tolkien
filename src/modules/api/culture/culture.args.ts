import { DateOperatorsInput, IdOperatorsInput, StringOperatorsInput } from '../common/common.types';
import { SortOrderEnum } from '@common/constants';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ListQueryInput } from '../common/common.args';

@InputType()
export class CultureFilterInput {
  @Field({ nullable: true })
  id: IdOperatorsInput;

  @Field({ nullable: true })
  active: boolean;

  @Field({ nullable: true })
  name: StringOperatorsInput;

  @Field({ nullable: true })
  text: StringOperatorsInput;

  @Field({ nullable: true })
  lotrPageId: StringOperatorsInput;

  @Field({ nullable: true })
  charactersText: StringOperatorsInput;

  @Field({ nullable: true })
  distinctions: StringOperatorsInput;

  @Field({ nullable: true })
  hairColor: StringOperatorsInput;

  @Field({ nullable: true })
  height: StringOperatorsInput;

  @Field({ nullable: true })
  languages: StringOperatorsInput;

  @Field({ nullable: true })
  lifespan: StringOperatorsInput;

  @Field({ nullable: true })
  locationText: StringOperatorsInput;

  @Field({ nullable: true })
  origins: StringOperatorsInput;

  @Field({ nullable: true })
  skinColor: StringOperatorsInput;

  @Field({ nullable: true })
  otherNames: StringOperatorsInput;
}

@InputType()
export class CultureSortInput {
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
export class CultureListQueryInput extends ListQueryInput<CultureSortInput, CultureFilterInput>(
  CultureSortInput,
  CultureFilterInput,
) {}

@ArgsType()
export class CultureListQueryOption {
  @Field(() => CultureListQueryInput, { nullable: false })
  options: CultureListQueryInput;
}
