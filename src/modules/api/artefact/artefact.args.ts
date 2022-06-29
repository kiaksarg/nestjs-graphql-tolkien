import { DateOperatorsInput, IdOperatorsInput, StringOperatorsInput } from '../common/common.types';
import { SortOrderEnum } from '@common/constants';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ListQueryInput } from '../common/common.args';

@InputType()
export class ArtefactFilterInput {
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
  locationsText: StringOperatorsInput;

  @Field({ nullable: true })
  appearance: StringOperatorsInput;

  @Field({ nullable: true })
  usage: StringOperatorsInput;

  @Field({ nullable: true })
  otherNames: StringOperatorsInput;
}

@InputType()
export class ArtefactSortInput {
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
export class ArtefactListQueryInput extends ListQueryInput<ArtefactSortInput, ArtefactFilterInput>(
  ArtefactSortInput,
  ArtefactFilterInput,
) {}

@ArgsType()
export class ArtefactListQueryOption {
  @Field(() => ArtefactListQueryInput, { nullable: false })
  options: ArtefactListQueryInput;
}
