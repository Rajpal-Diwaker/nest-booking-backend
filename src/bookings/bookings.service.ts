import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Logger } from '@nestjs/common';
import { BookingsRepository } from './bookings.repository';
import { Booking } from './bookings.entity';
import { CreateBookingDTO } from './dto/create-booking.dto';
import { GetBookingsFilterDto } from './dto/get-booking-filter.dto';
import { BookingStatus } from './enum/booking-status.enum';
import { GetBookingsByRoomDto } from './dto/get-booking-filter-by-room.dto';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

@Injectable()
export class BookingsService {
  private logger = new Logger('BookingsService', { timestamp: true });
  constructor(
    @InjectRepository(BookingsRepository)
    private bookingsRepository: BookingsRepository,
  ) {}

  async getBookings(
    user: User,
    filterDto?: GetBookingsFilterDto,
  ): Promise<Booking[]> {
    try {
      return await this.bookingsRepository.fetchAll(user, filterDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getBookingsByRoom(
    room: string,
    filterDto?: GetBookingsByRoomDto,
  ): Promise<Booking[]> {
    try {
      return await this.bookingsRepository.fetchAllByRoom(room, filterDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getBookingsByOrganisation(
    id: string,
    filterDto?: GetBookingsByRoomDto,
  ): Promise<Booking[]> {
    try {
      return await this.bookingsRepository.fetchAllByOrganisation(
        id,
        filterDto,
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getBookingById(id: string, user: User): Promise<Booking> {
    const found = await this.bookingsRepository.fetchOne(id, user);
    if (!found) {
      throw new NotFoundException(`Booking with id: ${id} not found`);
    }

    return found;
  }

  async updateBookingStatusById(
    id: string,
    status: BookingStatus,
    user: User,
  ): Promise<Booking> {
    await this.bookingsRepository.update(id, { status });
    return await this.getBookingById(id, user);
  }

  async createBooking(
    createBookingDTO: CreateBookingDTO,
    user: User,
    bookings: Booking[],
  ): Promise<Booking> {
    let isOverlap = false;
    for (let i = 0; i < bookings.length; i++) {
      isOverlap = this.checkTimeBetweenRange(
        bookings[i].startTime,
        bookings[i].endTime,
        createBookingDTO.startTime,
        createBookingDTO.endTime,
      );
      if (isOverlap) {
        break;
      }
    }
    if (!isOverlap)
      return await this.bookingsRepository.createOne(createBookingDTO, user);
    throw new BadRequestException('time period overlap');
  }

  checkTimeBetweenRange(startTime, endTime, checkStartTime, checkEndTime) {
    const moment = extendMoment(Moment);
    const range1 = moment.range(startTime, endTime);
    const range2 = moment.range(checkStartTime, checkEndTime);

    if (range1.overlaps(range2)) {
      return true;
    } else {
      return false;
    }
  }
}
