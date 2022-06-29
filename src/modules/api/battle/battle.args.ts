import { DateOperatorsInput, IdOperatorsInput, StringOperatorsInput } from '../common/common.types';
import { SortOrderEnum } from '@common/constants';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ListQueryInput } from '../common/common.args';

@InputType()
export class BattleFilterInput {
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
  locationsText: StringOperatorsInput;

  @Field({ nullable: true })
  conflict: StringOperatorsInput;

  @Field({ nullable: true })
  outcome: StringOperatorsInput;

  @Field({ nullable: true })
  date: StringOperatorsInput;
}

@InputType()
export class BattleSortInput {
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
export class BattleListQueryInput extends ListQueryInput<BattleSortInput, BattleFilterInput>(
  BattleSortInput,
  BattleFilterInput,
) {}

@ArgsType()
export class BattleListQueryOption {
  @Field(() => BattleListQueryInput, { nullable: false })
  options: BattleListQueryInput;
}
