import { Test, TestingModule } from '@nestjs/testing';
import { Organisation } from '../organisations/organisations.entity';
import { User } from '../auth/user.entity';
import { CreateRoomDTO } from './dto/create-room.dto';
import { GetRoomsFilterDto } from './dto/get-rooms-filter.dto';
import { RoomsController } from './rooms.controller';
import { Room } from './rooms.entity';
import { RoomsService } from './rooms.service';

describe('RoomsController', () => {
  let controller: RoomsController;
  let service: RoomsService;

  beforeEach(async () => {
    const MockService = {
      provide: RoomsService,
      useFactory: () => ({
        getRooms: jest.fn(() => []),
        getRoomById: jest.fn(() => {}),
        updateRoomStatusById: jest.fn(() => {}),
        createRoom: jest.fn(() => {}),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [RoomsService, MockService],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('calling createRoom method', async () => {
    const dto = new CreateRoomDTO();
    controller.createRoom(dto);
    expect(service.createRoom).toHaveBeenCalled();
    expect(service.createRoom).toHaveBeenCalledWith(dto);

    const result = [];
    const roomDto = new Room();
    const mock = jest.spyOn(service, 'createRoom');
    mock.mockImplementation(async () => roomDto);
    expect(await service.getRooms('orgid')).toMatchObject(result);
  });

  it('calling getRoom method', async () => {
    const roomFilterDTO = new GetRoomsFilterDto();
    const user = new User();
    user.organisation = new Organisation();
    controller.getRooms(roomFilterDTO, user);
    expect(service.getRooms).toHaveBeenCalled();
    expect(service.getRooms).toHaveBeenCalledWith(
      user.organisation.id,
      roomFilterDTO,
    );
  });
});
