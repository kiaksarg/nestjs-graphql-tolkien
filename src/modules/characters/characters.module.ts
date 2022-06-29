import { CommonModule } from '@modules/common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterEntity } from './entities/character.entity';
import { CharacterService } from './service/character.service';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterEntity]), CommonModule],
  providers: [CharacterService],
  exports: [CharacterService],
})
export class CharactersModule {}
