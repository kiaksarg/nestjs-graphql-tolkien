import { BaseEntity } from '../../common/entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { CharacterEntity } from '../../characters/entities/character.entity';
import { LocationEntity } from './location.entity';

@Entity({ name: 'location_to_character' })
@Index(['locationId', 'characterId'], { unique: true })
export class LocationToCharacterEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'location_id',
    type: 'integer',
  })
  locationId: number;

  @Column({
    name: 'character_id',
    type: 'integer',
  })
  characterId: number;

  @ManyToOne(() => LocationEntity, (location: LocationEntity) => location.characters, {
    nullable: false,
    // eager: true,
  })
  @JoinColumn({ name: 'location_id' })
  location: LocationEntity;

  @ManyToOne(() => CharacterEntity, (character: CharacterEntity) => character.locations, {
    nullable: false,
    // eager: true,
  })
  @JoinColumn({ name: 'character_id' })
  character: CharacterEntity;

  constructor(character_relation?: Partial<LocationToCharacterEntity>) {
    super();
    Object.assign(this, character_relation);
  }
}
