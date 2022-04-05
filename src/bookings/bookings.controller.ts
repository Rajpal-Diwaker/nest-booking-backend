import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/dto/get-user.decorator';
import { User } from '../auth/user.entity';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateBookingDTO } from './dto/create-booking.dto';
import { Booking } from './bookings.entity';
import { BookingsService } from './bookings.service';
import { GetBookingsFilterDto } from './dto/get-booking-filter.dto';
import { UpdateBookingDTO } from './dto/update-booking-status.dto';

@Controller('bookings')
@UseGuards(AuthGuard(), RolesGuard)
export class BookingsController {
  private logger = new Logger('BookingsController');
  constructor(private bookingsService: BookingsService) {}

  @Get()
  getBookings(
    @Query() filterDto: GetBookingsFilterDto,
    @GetUser() user: User,
  ): Promise<Booking[]> {
    return this.bookingsService.getBookings(user, filterDto);
  }

  @Get('/:id')
  getBookingById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Booking> {
    return this.bookingsService.getBookingById(id, user);
  }

  @Post()
  createBooking(
    @Body() createBookingDTO: CreateBookingDTO,
    @GetUser() user: User,
  ): Promise<Booking> {
    return this.bookingsService.createBooking(createBookingDTO, user);
  }

  @Patch('/:id/status')
  updateBookingStatusById(
    @Param('id') id: string,
    @Body() updateBookingStatusDTO: UpdateBookingDTO,
    @GetUser() user: User,
  ): Promise<Booking> {
    const { status } = updateBookingStatusDTO;
    return this.bookingsService.updateBookingStatusById(id, status, user);
  }
}
