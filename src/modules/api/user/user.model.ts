import { Paginated } from './../common/common.types';
import { UserStatusEnum } from '@common/constants';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: bigint;

  @Field()
  username: string;

  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  bio!: string;

  @Field({ nullable: true })
  avatar!: string;

  @Field({ nullable: true })
  publicEmail!: string;

  @Field({ nullable: true })
  address!: string;

  @Field({ nullable: true })
  website!: string;

  @Field({ nullable: true })
  youtube!: string;

  @Field({ nullable: true })
  socialMedia1!: string;

  @Field({ nullable: true })
  socialMedia2!: string;

  @Field()
  isSuperUser: boolean;

  @Field(() => UserStatusEnum)
  status: UserStatusEnum;
}

@ObjectType()
export class UserList extends Paginated<User>(User, false) {}
