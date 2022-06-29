import { UserService } from '../../identity/service/user.service';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { User, UserList } from './user.model';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserList)
  async users() {
    return this.userService.PagedUsers();
  }
  @Query(() => User)
  async user(@Args('username', { type: () => String }) username: string) {
    const user = await this.userService.getUser(username);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
