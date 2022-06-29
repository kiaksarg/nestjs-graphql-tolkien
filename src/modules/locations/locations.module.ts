import { CharactersModule } from '@modules/characters/characters.module';
import { CommonModule } from '@modules/common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationToCharacterEntity } from './entities/location-to-character.entity';
import { LocationEntity } from './entities/location.entity';
import { LocationService } from './service/location.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationEntity, LocationToCharacterEntity]),
    CommonModule,
    CharactersModule,
  ],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationsModule {}
