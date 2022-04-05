import { IsEnum } from 'class-validator';
import { BookingStatus } from '../enum/booking-status.enum';

export class UpdateBookingDTO {
  @IsEnum(BookingStatus)
  status: BookingStatus;
}
