import { IsString } from 'class-validator';
export class GetBookingsByRoomDto {
  @IsString()
  id: string;
}
