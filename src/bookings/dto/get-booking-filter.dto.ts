import { IsEnum, IsOptional, IsString } from 'class-validator';
// import { RoomStatus } from '../enum/booking-status.enum';
import { RoomType } from '../../rooms/enum/room-type.enum';

export class GetBookingsFilterDto {
  // @IsOptional()
  // @IsEnum(RoomStatus)
  // status?: RoomStatus;

  @IsOptional()
  @IsEnum(RoomType)
  type?: RoomType;

  @IsOptional()
  @IsString()
  search?: string;
}
