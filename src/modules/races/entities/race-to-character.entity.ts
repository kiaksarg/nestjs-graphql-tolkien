import { BaseEntity } from '../../common/entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { CharacterEntity } from '../../characters/entities/character.entity';
import { RaceEntity } from './race.entity';

@Entity({ name: 'race_to_character' })
@Index(['raceId', 'characterId'], { unique: true })
export class RaceToCharacterEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'race_id',
    type: 'integer',
  })
  raceId: number;

  @Column({
    name: 'character_id',
    type: 'integer',
  })
  characterId: number;

  @ManyToOne(() => RaceEntity, (race: RaceEntity) => race.characters, {
    nullable: false,
    // eager: true,
  })
  @JoinColumn({ name: 'race_id' })
  race: RaceEntity;

  @ManyToOne(() => CharacterEntity, (character: CharacterEntity) => character.races, {
    nullable: false,
    // eager: true,
  })
  @JoinColumn({ name: 'character_id' })
  character: CharacterEntity;

  constructor(character_relation?: Partial<RaceToCharacterEntity>) {
    super();
    Object.assign(this, character_relation);
  }
}
