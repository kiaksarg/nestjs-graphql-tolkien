import { Test, TestingModule } from '@nestjs/testing';
import { BattleResolver } from './battle.resolver';

describe('BattleResolver', () => {
  let resolver: BattleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BattleResolver],
    }).compile();

    resolver = module.get<BattleResolver>(BattleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
