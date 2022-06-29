import { Location } from '@modules/api/location/models/location.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Battle {
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
  locationsText!: string;

  @Field(() => [Location], { nullable: 'itemsAndList' })
  locations!: Location[];

  @Field({ nullable: true })
  conflict!: string;

  @Field({ nullable: true })
  outcome!: string;

  @Field({ nullable: true })
  date!: string;

  @Field()
  active: boolean;
}
