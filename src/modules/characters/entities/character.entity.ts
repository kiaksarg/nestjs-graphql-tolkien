import { BaseEntity } from '../../common/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { GenderEnum } from './../../../common/constants';
import { classToPlain } from 'class-transformer';
import { QuoteEntity } from './quote.entity';
import { RaceEntity } from './../../races/entities/race.entity';
import { ArtefactEntity } from './../../artefacts/entities/artefacts.entity';
import { CultureToCharacterEntity } from '../../cultures/entities/culture-to-character.entity';
import { LocationToCharacterEntity } from '../../locations/entities/location-to-character.entity';
import { RaceToCharacterEntity } from '../../races/entities/race-to-character.entity';

@Entity({ name: 'characters' })
export class CharacterEntity extends BaseEntity {
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

  @Column({
    name: 'gender',
    type: 'enum',
    enum: GenderEnum,
    nullable: false,
  })
  gender: GenderEnum;

  // QUOTE RELATION
  // One-to-many relation with Quote
  @OneToMany(() => QuoteEntity, (quote) => quote.character)
  quotes!: QuoteEntity[];

  //RACE RELATION
  //raceId Id
  //Many-to-one relation with Race

  // @Column({
  //   name: 'race_id',
  //   type: 'integer',
  //   nullable: false,
  // })
  // raceId!: number;

  // @ManyToOne(() => RaceEntity, (race: RaceEntity) => race.characters, {
  //   nullable: true,
  // })
  // @JoinColumn({ name: 'race_id' })
  // race!: RaceEntity;

  // RACE RELATION
  @OneToMany(() => RaceToCharacterEntity, (raceToChar) => raceToChar.race, { nullable: true })
  races!: RaceEntity[];
  // RACE RELATION

  // ARTEFACT RELATION
  @ManyToMany(() => ArtefactEntity, (artefact) => artefact.characters, { nullable: true })
  artefacts!: ArtefactEntity[];
  // ARTEFACT RELATION

  @Index({ fulltext: true })
  @Column({
    name: 'weapon',
    type: 'varchar',
    nullable: true,
  })
  weapon!: string;

  @Column({
    name: 'birth',
    type: 'varchar',
    nullable: true,
  })
  birth!: string;

  @Column({
    name: 'death',
    type: 'varchar',
    nullable: true,
  })
  death!: string;

  ////----CULTURE RELATION----
  //cultureId Id
  //Many-to-one relation with Culture

  // @Column({
  //   name: 'culture_id',
  //   type: 'integer',
  //   nullable: true,
  // })
  // cultureId!: number;

  // @ManyToOne(() => CultureEntity, (culture: CultureEntity) => culture.characters, {
  //   nullable: true,
  // })
  // @JoinColumn({ name: 'culture_id' })
  // culture!: CultureEntity;

  // CULTURE RELATION
  @OneToMany(() => CultureToCharacterEntity, (ccRel) => ccRel.culture, { nullable: true })
  cultures!: CultureToCharacterEntity[];
  // CULTURE RELATION

  //----CULTURE RELATION----

  @Column({
    name: 'eyes',
    type: 'varchar',
    nullable: true,
  })
  eyes!: string;

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

  //LOCATION RELATION
  @OneToMany(() => LocationToCharacterEntity, (locToChar) => locToChar.character, {
    nullable: true,
  })
  locations: LocationToCharacterEntity[];

  //locationId Id
  //Many-to-one relation with Race

  // @Column({
  //   name: 'location_id',
  //   type: 'integer',
  //   nullable: false,
  // })
  // locationId!: number;

  // @ManyToOne(() => LocationEntity, (location: LocationEntity) => location.characters, {
  //   nullable: true,
  // })
  // @JoinColumn({ name: 'location_id' })
  // location!: LocationEntity;

  //LOCATION RELATION

  @Index({ fulltext: true })
  @Column({
    name: 'other_names',
    type: 'text',
    nullable: true,
  })
  otherNames!: string;

  @Column({
    name: 'rule',
    type: 'varchar',
    nullable: true,
  })
  rule!: string;

  // One to many self reference --> spouse(s)
  @Column({
    name: 'spouse_id',
    nullable: true,
    type: 'integer',
  })
  spouseId!: number;

  @ManyToOne(() => CharacterEntity, (character) => character.spouses)
  @JoinColumn({ name: 'spouse_id' })
  spouse!: CharacterEntity;

  @OneToMany(() => CharacterEntity, (character) => character.spouse)
  spouses!: CharacterEntity[];

  @Index({ fulltext: true })
  @Column({
    name: 'titles',
    type: 'varchar',
    nullable: true,
  })
  titles!: string;

  toJSON() {
    return classToPlain(this);
  }
  // Constructor
  constructor(character?: Partial<CharacterEntity>) {
    super();
    Object.assign(this, character);
  }
}
