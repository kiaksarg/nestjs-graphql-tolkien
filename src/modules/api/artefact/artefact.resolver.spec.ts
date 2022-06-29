import { Test, TestingModule } from '@nestjs/testing';
import { ArtefactResolver } from './artefact.resolver';

describe('ArtefactResolver', () => {
  let resolver: ArtefactResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtefactResolver],
    }).compile();

    resolver = module.get<ArtefactResolver>(ArtefactResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
