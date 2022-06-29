import { CommonModule } from '@modules/common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtefactEntity } from './entities/artefacts.entity';
import { ArtefactService } from './service/artefact.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtefactEntity]), CommonModule],
  providers: [ArtefactService],
  exports: [ArtefactService],
})
export class ArtefactsModule {}
