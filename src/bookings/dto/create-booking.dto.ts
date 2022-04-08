import { IsNotEmpty } from 'class-validator';
import { User } from '../../auth/user.entity';
import { Room } from '../../rooms/rooms.entity';

export class CreateBookingDTO {
  @IsNotEmpty()
  notes: string;

  @IsNotEmpty()
  startTime: string;

  @IsNotEmpty()
  endTime: string;

  @IsNotEmpty()
  duration: number;

  @IsNotEmpty()
  room: Room;
}
