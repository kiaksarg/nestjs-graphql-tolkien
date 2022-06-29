import { BaseEntity } from '../../common/entities';
import { Entity, Column, PrimaryGeneratedColumn, Index, JoinTable, ManyToMany } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { LocationEntity } from './../../locations/entities/location.entity';

@Entity({ name: 'battles' })
export class BattleEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Index({ fulltext: true })
  @Column({
    name: 'name',
    type: 'varchar',
  })
  name: string;

  @Index({ fulltext: true })
  @Column({
    name: 'text',
    type: 'text',
  })
  text: string;

  @Index({ fulltext: true })
  @Column({
    name: 'locations_text',
    type: 'text',
  })
  locationsText: string;

  // RACE RELATION
  @ManyToMany(() => LocationEntity, (location) => location.battles, { nullable: false })
  @JoinTable()
  locations!: LocationEntity[];
  // RACE RELATION

  @Column({
    name: 'lotr_page_id',
    type: 'varchar',
  })
  lotrPageId: string;

  @Column({
    name: 'lotr_url',
    type: 'varchar',
    nullable: true,
  })
  lotrUrl: string;

  @Index({ fulltext: true })
  @Column({
    name: 'conflict',
    type: 'varchar',
    nullable: true,
  })
  conflict: string;

  @Index({ fulltext: true })
  @Column({
    name: 'date',
    type: 'varchar',
    nullable: true,
  })
  date!: string;

  @Index({ fulltext: true })
  @Column({
    name: 'outcome',
    type: 'text',
    nullable: true,
  })
  outcome!: string;

  toJSON() {
    return classToPlain(this);
  }

  // Constructor
  constructor(battle?: Partial<BattleEntity>) {
    super();
    Object.assign(this, battle);
  }
}
