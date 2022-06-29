import { UserEntity } from './../entities/user.entity';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  add(@Body() user: UserEntity): Observable<UserEntity> {
    return this.userService.add(user);
  }

  @Get()
  findAll(): Observable<UserEntity[]> {
    return this.userService.findAll();
  }
}
