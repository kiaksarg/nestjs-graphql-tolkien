import { IdInterceptor } from './middleware/id-interceptor';
import { CommonModule } from './../common/common.module';
import { IdCodecService } from './common/id-codec.service';
import { HelloResolver } from './hello/hello.resolver';
import { IdentityModule } from '../identity/identity.module';
import { UserResolver } from './user/user.resolver';
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './middleware/auth-guard';
import { RequestContextService } from './common/request-context.service';
import { CharacterResolver } from './character/character.resolver';
import { CharactersModule } from '@modules/characters/characters.module';
import { CultureResolver } from './culture/culture.resolver';
import { CulturesModule } from '@modules/cultures/cultures.module';
import { LocationResolver } from './location/location.resolver';
import { LocationsModule } from '@modules/locations/locations.module';
import { RaceResolver } from './race/race.resolver';
import { RacesModule } from '@modules/races/races.module';
import { ArtefactsModule } from '@modules/artefacts/artefact.module';
import { BattlesModule } from '@modules/battles/battles.module';
import { ArtefactResolver } from './artefact/artefact.resolver';
import { BattleResolver } from './battle/battle.resolver';

@Module({
  imports: [
    IdentityModule,
    CommonModule,
    CharactersModule,
    CulturesModule,
    LocationsModule,
    RacesModule,
    ArtefactsModule,
    BattlesModule,
  ],
  providers: [
    RequestContextService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    UserResolver,
    HelloResolver,
    IdCodecService,
    {
      provide: APP_INTERCEPTOR,
      useClass: IdInterceptor,
    },
    CharacterResolver,
    CultureResolver,
    LocationResolver,
    RaceResolver,
    ArtefactResolver,
    BattleResolver,
  ],
  exports: [IdCodecService],
})
export class ApiModule {}
