import { BaseEntity } from '../../common/entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { CultureEntity } from './culture.entity';
import { CharacterEntity } from '../../characters/entities/character.entity';

@Entity({ name: 'culture_to_character' })
@Index(['cultureId', 'characterId'], { unique: true })
export class CultureToCharacterEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'culture_id',
    type: 'integer',
  })
  cultureId: number;

  @Column({
    name: 'character_id',
    type: 'integer',
  })
  characterId: number;

  @ManyToOne(() => CultureEntity, (culture: CultureEntity) => culture.characters, {
    nullable: false,
    // eager: true,
  })
  @JoinColumn({ name: 'culture_id' })
  culture: CultureEntity;

  @ManyToOne(() => CharacterEntity, (character: CharacterEntity) => character.cultures, {
    nullable: false,
    // eager: true,
  })
  @JoinColumn({ name: 'character_id' })
  character: CharacterEntity;

  constructor(character_relation?: Partial<CultureToCharacterEntity>) {
    super();
    Object.assign(this, character_relation);
  }
}
