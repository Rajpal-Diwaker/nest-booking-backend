import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GetRoomsFilterDto } from './dto/get-rooms-filter.dto';
import { Logger } from '@nestjs/common';
import { Room } from './rooms.entity';
import { CreateRoomDTO } from './dto/create-room.dto';
import { RoomStatus } from './enum/room-status.enum';

@EntityRepository(Room)
export class RoomsRepository extends Repository<Room> {
  private logger = new Logger('RoomRepository', { timestamp: true });

  async createOne(createTaskDTO: CreateRoomDTO): Promise<Room> {
    const { name, description, type, minCapacity, maxCapacity, image } =
      createTaskDTO;
    const room = await this.create({
      name,
      description,
      status: RoomStatus.AVAILABLE,
      type,
      minCapacity,
      maxCapacity,
      image,
    });
    await this.save(room);
    return room;
  }

  async fetchOne(id: string): Promise<Room> {
    return await this.findOne({ where: { id } });
  }

  async updateTaskStatusById(id: string, status: RoomStatus) {
    await this.update(id, { status });
  }

  async fetchAll(filterDto?: GetRoomsFilterDto): Promise<Room[]> {
    const { status, search, type } = filterDto;
    const query = this.createQueryBuilder('room');

    if (status) {
      query.andWhere('room.status = :status', { status });
    }

    if (type) {
      query.andWhere('room.type = :type', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(room.title) LIKE LOWER(:search) OR LOWER(room.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(`Failed to get room, error: ${error.stack}`);
      throw new InternalServerErrorException();
    }
  }
}
