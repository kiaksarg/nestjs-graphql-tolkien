import { CharactersModule } from '@modules/characters/characters.module';
import { CommonModule } from '@modules/common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceToCharacterEntity } from './entities/race-to-character.entity';
import { RaceEntity } from './entities/race.entity';
import { RaceService } from './service/race.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RaceEntity, RaceToCharacterEntity]),
    CommonModule,
    CharactersModule,
  ],
  providers: [RaceService],
  exports: [RaceService],
})
export class RacesModule {}
