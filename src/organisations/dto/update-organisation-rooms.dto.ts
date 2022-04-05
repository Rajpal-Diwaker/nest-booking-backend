import { IsNotEmpty } from 'class-validator';

export class UpdateOrganisationRoomDTO {
  @IsNotEmpty()
  roomBooked: number;
}
