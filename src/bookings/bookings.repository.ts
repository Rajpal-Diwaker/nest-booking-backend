import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Booking } from './bookings.entity';
import { CreateBookingDTO } from './dto/create-booking.dto';
import { BookingStatus } from './enum/booking-status.enum';
import { GetBookingsFilterDto } from './dto/get-booking-filter.dto';
import { User } from 'src/auth/user.entity';
import { Room } from 'src/rooms/rooms.entity';
import { GetBookingsByRoomDto } from './dto/get-booking-filter-by-room.dto';

@EntityRepository(Booking)
export class BookingsRepository extends Repository<Booking> {
  private logger = new Logger('BookingsRepository', { timestamp: true });

  async createOne(
    createTaskDTO: CreateBookingDTO,
    user: User,
  ): Promise<Booking> {
    const { notes, startTime, endTime, duration, room } = createTaskDTO;
    const { organisation } = user;
    const { id } = organisation;
    const booking = await this.create({
      notes,
      startTime,
      endTime,
      status: BookingStatus.BOOKED,
      duration,
      room,
      user,
      organisation: id,
    });
    await this.save(booking);
    return booking;
  }

  async fetchOne(id: string, user: User): Promise<Booking> {
    return await this.findOne({
      where: { id, user },
      relations: ['room'],
    });
  }

  async updateBookingStatusById(id: string, status: BookingStatus) {
    await this.update(id, { status });
  }

  async fetchAll(
    user: User,
    filterDto?: GetBookingsFilterDto,
  ): Promise<Booking[]> {
    const { search, type } = filterDto;
    const query = this.createQueryBuilder('booking');
    query.where({ user });

    // if (type) {
    //   query.andWhere('booking.type = :type', { status });
    // }

    if (search) {
      query.andWhere('(LOWER(booking.notes) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }
    try {
      const booking = await query
        .leftJoinAndSelect('booking.room', 'room')
        .getMany();
      return booking;
    } catch (error) {
      this.logger.error(`Failed to get booking, error: ${error.stack}`);
      throw new InternalServerErrorException();
    }
  }

  async fetchAllByRoom(
    id: string,
    filterDto?: GetBookingsByRoomDto,
  ): Promise<Booking[]> {
    const query = this.createQueryBuilder('booking');

    try {
      const booking = await query
        .leftJoinAndSelect('booking.room', 'room')
        .where('room.id = :id', { id })
        .getMany();
      return booking;
    } catch (error) {
      this.logger.error(`Failed to get booking, error: ${error.stack}`);
      throw new InternalServerErrorException();
    }
  }

  async fetchAllByOrganisation(
    organisation: string,
    filterDto?: GetBookingsByRoomDto,
  ): Promise<Booking[]> {
    const query = this.createQueryBuilder('booking');
    try {
      const booking = await query
        .leftJoinAndSelect('booking.room', 'room')
        .where('booking.organisation = :organisation', { organisation })
        .getMany();
      return booking;
    } catch (error) {
      this.logger.error(`Failed to get booking, error: ${error.stack}`);
      throw new InternalServerErrorException();
    }
  }
}
