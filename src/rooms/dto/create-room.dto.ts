import { IsEnum, IsNotEmpty } from 'class-validator';
import { Organisation } from 'src/organisations/organisations.entity';
import { RoomStatus } from '../enum/room-status.enum';
import { RoomType } from '../enum/room-type.enum';

export class CreateRoomDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(RoomType)
  type: RoomType;

  @IsNotEmpty()
  minCapacity: number;

  @IsNotEmpty()
  maxCapacity: number;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  organisation: Organisation;
}
