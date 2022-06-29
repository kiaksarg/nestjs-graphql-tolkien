import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities';
import { UserStatusEnum } from './../../../common/constants';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Index({ unique: true })
  @Column({
    name: 'username',
    type: 'varchar',
    length: 82,
  })
  username: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
  })
  email: string;

  @Column({
    name: 'full_name',
    type: 'varchar',
    length: 52,
  })
  fullName: string;

  @Column({
    name: 'bio',
    type: 'varchar',
    length: 345,
    nullable: true,
  })
  bio!: string;

  @Column({
    name: 'avatar',
    type: 'varchar',
    nullable: true,
  })
  avatar!: string;

  @Column({
    name: 'public_email',
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  publicEmail!: string;

  @Column({
    name: 'address',
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  address!: string;

  @Column({
    name: 'website',
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  website!: string;

  @Column({
    name: 'youtube',
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  youtube!: string;

  @Column({
    name: 'social_media',
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  socialMedia!: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'is_super_user',
    type: 'boolean',
    default: false,
  })
  isSuperUser: boolean;

  @Column({
    name: 'status',
    type: 'enum',
    enum: UserStatusEnum,
    nullable: false,
  })
  status: UserStatusEnum;

  constructor(user?: Partial<UserEntity>) {
    super();
    Object.assign(this, user);
  }
}
