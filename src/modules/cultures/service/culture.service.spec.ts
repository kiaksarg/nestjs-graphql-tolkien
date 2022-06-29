import { Test, TestingModule } from '@nestjs/testing';
import { CultureService } from './culture.service';

describe('CultureService', () => {
  let service: CultureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CultureService],
    }).compile();

    service = module.get<CultureService>(CultureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
