import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrganisationDTO } from './dto/create-organisation.dto';
import { OrganisationsController } from './organisations.controller';
import { OrganisationsService } from './organisations.service';

describe('OrganisationsController', () => {
  let controller: OrganisationsController;
  let service: OrganisationsService;

  beforeEach(async () => {
    const MockService = {
      provide: OrganisationsService,
      useFactory: () => ({
        fetchAllOrganisations: jest.fn(() => []),
        createOrganisation: jest.fn(() => {}),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganisationsController],
      providers: [OrganisationsService, MockService],
    }).compile();

    controller = module.get<OrganisationsController>(OrganisationsController);
    service = module.get<OrganisationsService>(OrganisationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('OrganisationController: create organisation', () => {
    it('calling createOrganisation method', async () => {
      const dto = new CreateOrganisationDTO();
      controller.createOrganisation(dto);
      expect(service.createOrganisation).toHaveBeenCalled();
      expect(service.createOrganisation).toHaveBeenCalledWith(dto);
    });
  });

  describe('OrganisationController: fetch organisations', () => {
    it('calling getOrganisations method', async () => {
      controller.getOrganisations();
      expect(service.fetchAllOrganisations).toHaveBeenCalled();
    });
  });
});
