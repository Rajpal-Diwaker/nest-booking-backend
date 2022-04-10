import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrganisationDTO } from './dto/create-organisation.dto';
import { Organisation } from './organisations.entity';
import { OrganisationsRepository } from './organisations.repository';
import { OrganisationsService } from './organisations.service';

describe('OrganisationsService', () => {
  let service: OrganisationsService;
  let repository: OrganisationsRepository;

  beforeEach(async () => {
    const MockService = {
      provide: OrganisationsRepository,
      useFactory: () => ({
        fetchAll: jest.fn(() => []),
        createOne: jest.fn(() => {}),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganisationsService, MockService],
    }).compile();

    service = module.get<OrganisationsService>(OrganisationsService);
    repository = module.get<OrganisationsRepository>(OrganisationsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('OrganisationService: fetchAll', () => {
    it('calls OrganisationRepository.fetchAll and returns the result', async () => {
      const result = [];
      const mockOrganisations: Organisation[] = [];
      const mock = jest.spyOn(repository, 'fetchAll');
      mock.mockImplementation(async () => mockOrganisations);
      expect(await service.fetchAllOrganisations()).toMatchObject(result);
    });
  });

  describe('OrganisationService: createOne', () => {
    it('calls OrganisationRepository.createOne and returns the result', async () => {
      const mockOrganisations = new CreateOrganisationDTO();
      const result = new Organisation();
      const mock = jest.spyOn(repository, 'createOne');
      mock.mockImplementation(async () => result);
      expect(await service.createOrganisation(mockOrganisations)).toMatchObject(
        result,
      );
    });
  });
});
