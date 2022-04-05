import { IsEnum } from 'class-validator';
import { RoomStatus } from '../enum/room-status.enum';

export class UpdateRoomDTO {
  @IsEnum(RoomStatus)
  status: RoomStatus;
}
