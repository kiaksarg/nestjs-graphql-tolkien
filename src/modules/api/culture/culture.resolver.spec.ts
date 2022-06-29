import { Test, TestingModule } from '@nestjs/testing';
import { CultureResolver } from './culture.resolver';

describe('CultureResolver', () => {
  let resolver: CultureResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CultureResolver],
    }).compile();

    resolver = module.get<CultureResolver>(CultureResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
