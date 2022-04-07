import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RoomStatus } from '../enum/room-status.enum';
import { RoomType } from '../enum/room-type.enum';

export class GetRoomsFilterDto {
  @IsOptional()
  @IsEnum(RoomStatus)
  status?: RoomStatus;

  @IsOptional()
  @IsEnum(RoomType)
  type?: RoomType;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  organisation?: string;
}
