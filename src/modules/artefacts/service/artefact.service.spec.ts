import { Test, TestingModule } from '@nestjs/testing';
import { ArtefactService } from './artefact.service';

describe('ArtifactService', () => {
  let service: ArtefactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtefactService],
    }).compile();

    service = module.get<ArtefactService>(ArtefactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
