import { BaseEntity } from '../../common/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { classToPlain } from 'class-transformer';
import { LocationEntity } from './../../locations/entities/location.entity';
import { CultureToCharacterEntity } from './culture-to-character.entity';

@Entity({ name: 'cultures' })
export class CultureEntity extends BaseEntity {
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
  lotrUrl!: string;

  @Index({ fulltext: true })
  @Column({
    name: 'characters_text',
    type: 'varchar',
    nullable: true,
  })
  charactersText!: string;

  // CHARACTER RELATION
  // One-to-many relation with Character
  // @OneToMany(() => CharacterEntity, (character) => character.culture)
  // characters!: CharacterEntity[];
  // CHARACTER RELATION

  // CHARACTER RELATION

  @OneToMany(() => CultureToCharacterEntity, (culToChar) => culToChar.character, { nullable: true })
  characters!: CultureToCharacterEntity[];

  // CHARACTER RELATION

  @Index({ fulltext: true })
  @Column({
    name: 'distinctions',
    type: 'varchar',
    nullable: true,
  })
  distinctions!: string;

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

  // LOCATIONS RELATION

  @ManyToMany(() => LocationEntity, (location) => location.cultures, { nullable: true })
  @JoinTable()
  locations!: LocationEntity[];

  // LOCATIONS RELATION

  @Index({ fulltext: true })
  @Column({
    name: 'location_text',
    type: 'varchar',
    nullable: true,
  })
  locationText!: string;

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
  constructor(culture?: Partial<CultureEntity>) {
    super();
    Object.assign(this, culture);
  }
}
