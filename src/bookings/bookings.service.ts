import {
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
  ): Promise<Booking> {
    return await this.bookingsRepository.createOne(createBookingDTO, user);
  }
}
