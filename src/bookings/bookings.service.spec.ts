import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../auth/user.entity';
import { Booking } from './bookings.entity';
import { BookingsRepository } from './bookings.repository';
import { BookingsService } from './bookings.service';

describe('BookingsService', () => {
  let service: BookingsService;
  let repository: BookingsRepository;

  beforeEach(async () => {
    const MockService = {
      provide: BookingsRepository,
      useFactory: () => ({
        fetchAll: jest.fn(() => []),
        fetchOne: jest.fn(() => {}),
        createOne: jest.fn(() => {}),
        updateBookingStatusById: jest.fn(() => {}),
        fetchAllByOrganisation: jest.fn(() => {}),
        fetchAllByRoom: jest.fn(() => {}),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingsService, MockService],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    repository = module.get<BookingsRepository>(BookingsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('BookingsService: getBookings', () => {
    it('calls BookingsRepository.fetchAll and returns the result', async () => {
      const result = [];
      const mockBookings: Booking[] = [];
      const users = new User();

      const mock = jest.spyOn(repository, 'fetchAll');
      mock.mockImplementation(async () => mockBookings);
      expect(await service.getBookings(users)).toMatchObject(result);
    });
  });

  // describe('OrganisationService: createOne', () => {
  //   it('calls OrganisationRepository.createOne and returns the result', async () => {
  //     const mockOrganisations = new CreateOrganisationDTO();
  //     const result = new Organisation();
  //     const mock = jest.spyOn(repository, 'createOne');
  //     mock.mockImplementation(async () => result);
  //     expect(await service.createOrganisation(mockOrganisations)).toMatchObject(
  //       result,
  //     );
  //   });
  // });
});
