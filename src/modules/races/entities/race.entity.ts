import { BaseEntity } from '../../common/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { classToPlain } from 'class-transformer';
import { LocationEntity } from './../../locations/entities/location.entity';
import { RaceToCharacterEntity } from './race-to-character.entity';

@Entity({ name: 'races' })
export class RaceEntity extends BaseEntity {
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
  @ManyToMany(() => LocationEntity, (location) => location.races, { nullable: false })
  @JoinTable()
  locations: LocationEntity[];
  // RACE RELATION

  @Index({ fulltext: true })
  @Column({
    name: 'distinctions',
    type: 'varchar',
    nullable: false,
  })
  distinctions: string;

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
    name: 'characters_text',
    type: 'varchar',
    nullable: true,
  })
  charactersText!: string;

  // CHARACTER RELATION
  @OneToMany(() => RaceToCharacterEntity, (raceToChar) => raceToChar.character, { nullable: true })
  characters!: RaceToCharacterEntity[];
  // CHARACTER RELATION

  @Column({
    name: 'hair_color',
    type: 'varchar',
    nullable: true,
  })
  hairColor!: string;

  @Column({
    name: 'height',
    type: 'varchar',
    nullable: true,
  })
  height!: string;

  @Index({ fulltext: true })
  @Column({
    name: 'languages',
    type: 'varchar',
    nullable: true,
  })
  languages!: string;

  @Index({ fulltext: true })
  @Column({
    name: 'lifespan',
    type: 'varchar',
    nullable: true,
  })
  lifespan!: string;

  @Index({ fulltext: true })
  @Column({
    name: 'other_names',
    type: 'varchar',
    nullable: true,
  })
  otherNames!: string;

  @Index({ fulltext: true })
  @Column({
    name: 'origins',
    type: 'varchar',
    nullable: true,
  })
  origins!: string;

  @Index({ fulltext: true })
  @Column({
    name: 'skin_color',
    type: 'varchar',
    nullable: true,
  })
  skinColor!: string;

  toJSON() {
    return classToPlain(this);
  }

  // Constructor
  constructor(culture?: Partial<RaceEntity>) {
    super();
    Object.assign(this, culture);
  }
}
