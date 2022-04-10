import { Test, TestingModule } from '@nestjs/testing';
import { RoomsRepository } from './room.repository';
import { Room } from './rooms.entity';
import { RoomsService } from './rooms.service';

const mockRoomsRepository = () => ({
  fetchAll: jest.fn(() => []),
});

const mockRooms: Room[] = [];

describe('RoomsService', () => {
  let service: RoomsService;
  let repository: RoomsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        {
          provide: RoomsRepository,
          useFactory: mockRoomsRepository,
        },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
    repository = module.get<RoomsRepository>(RoomsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('getRooms', () => {
    it('calls RoomRepository.getRooms and returns the result', async () => {
      const result = [];
      const mock = jest.spyOn(repository, 'fetchAll');
      mock.mockImplementation(async () => mockRooms);
      expect(await service.getRooms('orgid')).toMatchObject(result);
    });
  });
});
