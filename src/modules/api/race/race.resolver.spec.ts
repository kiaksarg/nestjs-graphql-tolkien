import { Test, TestingModule } from '@nestjs/testing';
import { RaceResolver } from './race.resolver';

describe('RaceResolver', () => {
  let resolver: RaceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RaceResolver],
    }).compile();

    resolver = module.get<RaceResolver>(RaceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
