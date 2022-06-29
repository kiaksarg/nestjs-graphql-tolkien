import { BaseEntity } from '../../common/entities';
import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { CharacterEntity } from './character.entity';

@Entity({ name: 'quotes' })
export class QuoteEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Index({ fulltext: true })
  @Column({
    name: 'text',
    type: 'text',
  })
  text: string;

  @Column({
    name: 'source',
    type: 'text',
  })
  source: string;

  //CHARACTER RELATION
  //characterId Id
  //Many-to-one relation with Character

  @Column({
    name: 'character_id',
    type: 'integer',
    nullable: false,
  })
  characterId!: number;

  @ManyToOne(() => CharacterEntity, (character: CharacterEntity) => character.quotes, {
    nullable: true,
  })
  @JoinColumn({ name: 'character_id' })
  character!: CharacterEntity;

  //CHARACTER RELATION

  toJSON() {
    return classToPlain(this);
  }

  // Constructor
  constructor(quote?: Partial<QuoteEntity>) {
    super();
    Object.assign(this, quote);
  }
}
