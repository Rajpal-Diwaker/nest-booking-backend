import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Logger } from '@nestjs/common';
import { RoomsRepository } from './room.repository';
import { GetRoomsFilterDto } from './dto/get-rooms-filter.dto';
import { Room } from './rooms.entity';
import { RoomStatus } from './enum/room-status.enum';
import { CreateRoomDTO } from './dto/create-room.dto';

@Injectable()
export class RoomsService {
  private logger = new Logger('RoomsService', { timestamp: true });
  constructor(
    @InjectRepository(RoomsRepository)
    private roomsRepository: RoomsRepository,
  ) {}

  async getRooms(filterDto?: GetRoomsFilterDto): Promise<Room[]> {
    try {
      return await this.roomsRepository.fetchAll(filterDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getRoomById(id: string): Promise<Room> {
    const found = await this.roomsRepository.fetchOne(id);
    if (!found) {
      throw new NotFoundException(`Room with id: ${id} not found`);
    }

    return found;
  }

  async updateRoomStatusById(
    id: string,
    status: RoomStatus,
    user: User,
  ): Promise<Room> {
    await this.roomsRepository.update(id, { status });
    return await this.getRoomById(id);
  }

  async createRoom(createRoomDTO: CreateRoomDTO): Promise<Room> {
    return await this.roomsRepository.createOne(createRoomDTO);
  }
}
