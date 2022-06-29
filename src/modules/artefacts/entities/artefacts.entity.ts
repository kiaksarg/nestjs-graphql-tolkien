import { BaseEntity } from '../../common/entities';
import { Entity, Column, PrimaryGeneratedColumn, Index, JoinTable, ManyToMany } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { CharacterEntity } from './../../characters/entities/character.entity';
import { LocationEntity } from './../../locations/entities/location.entity';

@Entity({ name: 'artefacts' })
export class ArtefactEntity extends BaseEntity {
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

  // CHARACTER RELATION
  @ManyToMany(() => CharacterEntity, (character) => character.artefacts, { nullable: false })
  @JoinTable()
  characters: CharacterEntity[];
  // CHARACTER RELATION

  @Index({ fulltext: true })
  @Column({
    name: 'locations_text',
    type: 'varchar',
    nullable: true,
  })
  locationsText: string;

  // RACE RELATION
  @ManyToMany(() => LocationEntity, (location) => location.artefacts, { nullable: true })
  @JoinTable()
  locations!: LocationEntity[];
  // RACE RELATION

  @Index({ fulltext: true })
  @Column({
    name: 'appearance',
    type: 'varchar',
    nullable: true,
  })
  appearance: string;

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
    name: 'other_names',
    type: 'varchar',
    nullable: true,
  })
  otherNames!: string;

  @Index({ fulltext: true })
  @Column({
    name: 'usage',
    type: 'varchar',
    nullable: true,
  })
  usage!: string;

  toJSON() {
    return classToPlain(this);
  }

  // Constructor
  constructor(artefact?: Partial<ArtefactEntity>) {
    super();
    Object.assign(this, artefact);
  }
}
