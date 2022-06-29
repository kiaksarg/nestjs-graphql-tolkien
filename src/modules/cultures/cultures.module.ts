import { CharactersModule } from '@modules/characters/characters.module';
import { CommonModule } from '@modules/common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultureToCharacterEntity } from './entities/culture-to-character.entity';
import { CultureEntity } from './entities/culture.entity';
import { CultureService } from './service/culture.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CultureEntity, CultureToCharacterEntity]),
    CommonModule,
    CharactersModule,
  ],
  providers: [CultureService],
  exports: [CultureService],
})
export class CulturesModule {}
