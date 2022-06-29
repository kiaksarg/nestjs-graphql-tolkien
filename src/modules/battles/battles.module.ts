import { CommonModule } from '@modules/common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattleEntity } from './entities/battle.entity';
import { BattleService } from './service/battle.service';

@Module({
  imports: [TypeOrmModule.forFeature([BattleEntity]), CommonModule],
  providers: [BattleService],
  exports: [BattleService],
})
export class BattlesModule {}
