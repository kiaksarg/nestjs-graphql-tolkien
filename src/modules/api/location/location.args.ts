import { DateOperatorsInput, IdOperatorsInput, StringOperatorsInput } from '../common/common.types';
import { SortOrderEnum } from '@common/constants';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ListQueryInput } from '../common/common.args';

@InputType()
export class LocationFilterInput {
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
  capitalText: StringOperatorsInput;

  @Field({ nullable: true })
  cultureText: StringOperatorsInput;

  @Field({ nullable: true })
  description: StringOperatorsInput;

  @Field({ nullable: true })
  events: StringOperatorsInput;

  @Field({ nullable: true })
  foundedOrBuilt: StringOperatorsInput;

  @Field({ nullable: true })
  governanceText: StringOperatorsInput;

  @Field({ nullable: true })
  lifespan: StringOperatorsInput;

  @Field({ nullable: true })
  majorTownsText: StringOperatorsInput;

  @Field({ nullable: true })
  otherNames: StringOperatorsInput;

  @Field({ nullable: true })
  position: StringOperatorsInput;

  @Field({ nullable: true })
  regionsText: StringOperatorsInput;

  @Field({ nullable: true })
  type: StringOperatorsInput;
}

@InputType()
export class LocationSortInput {
  @Field(() => SortOrderEnum, { nullable: true })
  id: SortOrderEnum;

  @Field(() => SortOrderEnum, { nullable: true })
  name: SortOrderEnum;

  @Field(() => SortOrderEnum, { nullable: true })
  type: SortOrderEnum;

  @Field(() => SortOrderEnum, { nullable: true })
  lifespan: SortOrderEnum;

  @Field(() => DateOperatorsInput, { nullable: true })
  createdAt: DateOperatorsInput;

  @Field(() => DateOperatorsInput, { nullable: true })
  updatedAt: DateOperatorsInput;
}

@InputType()
export class LocationListQueryInput extends ListQueryInput<LocationSortInput, LocationFilterInput>(
  LocationSortInput,
  LocationFilterInput,
) {}

@ArgsType()
export class LocationListQueryOption {
  @Field(() => LocationListQueryInput, { nullable: false })
  options: LocationListQueryInput;
}
