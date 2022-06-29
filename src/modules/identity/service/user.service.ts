import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from './../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  getUserById(id: bigint): Promise<UserEntity> {
    return this.userRepository.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
  }
  getUser(username: string): Promise<UserEntity> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
  }

  add(user: UserEntity): Observable<UserEntity> {
    return from(this.userRepository.save(user));
  }

  findAll(): Observable<UserEntity[]> {
    return from(this.userRepository.find());
  }

  // async PagedUsers(): Promise<PaginatedList<User>> {
  async PagedUsers(): Promise<any> {
    return this.userRepository
      .createQueryBuilder()
      .getManyAndCount()
      .then(([items, totalItems]) => {
        return {
          items,
          totalItems,
        };
      });
  }
}
