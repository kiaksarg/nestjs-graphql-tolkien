import { BaseEntity } from '../../common/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { classToPlain } from 'class-transformer';
import { CharacterEntity } from './../../characters/entities/character.entity';
import { CultureEntity } from './../../cultures/entities/culture.entity';
import { RaceEntity } from './../../races/entities/race.entity';
import { ArtefactEntity } from './../../artefacts/entities/artefacts.entity';
import { BattleEntity } from './../../battles/entities/battle.entity';
import { LocationToCharacterEntity } from './location-to-character.entity';

@Entity({ name: 'locations' })
export class LocationEntity extends BaseEntity {
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
  lotrUrl: string;

  @Index({ fulltext: true })
  @Column({
    name: 'capital_text',
    type: 'varchar',
    nullable: true,
  })
  capitalText: string;

  // Third table relations with location itself --> a location can have more than one capitals
  // @OneToMany(() => CapitalRelationEntity, (capitalRelation) => capitalRelation.location)
  // public capitalOfLocations!: CapitalRelationEntity[];

  // @OneToMany(() => CapitalRelationEntity, (capitalRelation) => capitalRelation.capital)
  // public capitals!: CapitalRelationEntity[];
  // //

  // CAPITAL RELATION

  @ManyToMany(() => LocationEntity, { nullable: true })
  @JoinTable()
  capitals!: LocationEntity[];
  // CAPITAL RELATION

  // CULTURE RELATION
  @ManyToMany(() => CultureEntity, (culture) => culture.locations, { nullable: true })
  cultures: CultureEntity[];
  // CULTURE RELATION

  @Index({ fulltext: true })
  @Column({
    name: 'culture_text',
    type: 'varchar',
    nullable: true,
  })
  cultureText!: string;

  @Index({ fulltext: true })
  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description!: string;

  @Index({ fulltext: true })
  @Column({
    name: 'events',
    type: 'varchar',
    nullable: true,
  })
  events!: string;

  @Index({ fulltext: true })
  @Column({
    name: 'founded_or_built',
    type: 'varchar',
    nullable: true,
  })
  foundedOrBuilt!: string;

  @Index({ fulltext: true })
  @Column({
    name: 'governance_text',
    type: 'varchar',
    nullable: true,
  })
  governanceText!: string;

  // CHARACTER RELATION
  // Many-to-many relation with Character
  @ManyToMany(() => CharacterEntity)
  @JoinTable()
  governance: CharacterEntity[];

  @OneToMany(() => LocationToCharacterEntity, (locToChar) => locToChar.location, { nullable: true })
  characters!: LocationToCharacterEntity[];
  // CHARACTER RELATION

  @Index({ fulltext: true })
  @Column({
    name: 'lifespan',
    type: 'varchar',
    nullable: true,
  })
  lifespan!: string;

  @Index({ fulltext: true })
  @Column({
    name: 'major_towns_text',
    type: 'varchar',
    nullable: true,
  })
  majorTownsText!: string;

  // Third table relations with location itself --> a location can have more than one majorTowns
  // @OneToMany(() => MajorTownsRelationEntity, (majorTownsRelation) => majorTownsRelation.location)
  // public majorTownsOfLocations!: MajorTownsRelationEntity[];

  // @OneToMany(() => MajorTownsRelationEntity, (majorTownsRelation) => majorTownsRelation.majorTown)
  // public majorTowns!: MajorTownsRelationEntity[];
  //

  // MajorTowns RELATION
  @ManyToMany(() => LocationEntity, { nullable: true })
  @JoinTable()
  majorTowns!: LocationEntity[];
  // MajorTowns RELATION

  @Index({ fulltext: true })
  @Column({
    name: 'other_names',
    type: 'varchar',
    nullable: true,
  })
  otherNames!: string;

  @Index({ fulltext: true })
  @Column({
    name: 'position',
    type: 'varchar',
    nullable: true,
  })
  position!: string;

  @Index({ fulltext: true })
  @Column({
    name: 'regions_text',
    type: 'varchar',
    nullable: true,
  })
  regionsText!: string;

  // // Third table relations with location itself --> a location can have more than one majorTowns
  // @OneToMany(() => RegionRelationEntity, (regionRelation) => regionRelation.location)
  // public regionsOfLocations!: RegionRelationEntity[];

  // @OneToMany(() => RegionRelationEntity, (regionRelation) => regionRelation.region)
  // public regions!: RegionRelationEntity[];
  // //

  // MajorTowns RELATION
  @ManyToMany(() => LocationEntity, { nullable: true })
  @JoinTable()
  regions!: LocationEntity[];
  // MajorTowns RELATION

  @Index({ fulltext: true })
  @Column({
    name: 'type',
    type: 'varchar',
    nullable: true,
  })
  type!: string;

  // RACE RELATION
  @ManyToMany(() => RaceEntity, (race) => race.locations, { nullable: true })
  races: RaceEntity[];
  // RACE RELATION

  // ARTEFACT RELATION
  @ManyToMany(() => ArtefactEntity, (artefact) => artefact.locations, { nullable: true })
  artefacts!: ArtefactEntity[];
  // ARTEFACT RELATION

  // BATTLES RELATION
  @ManyToMany(() => BattleEntity, (battle) => battle.locations, { nullable: true })
  battles!: BattleEntity[];
  // BATTLES RELATION

  toJSON() {
    return classToPlain(this);
  }

  // Constructor
  constructor(location?: Partial<LocationEntity>) {
    super();
    Object.assign(this, location);
  }
}
