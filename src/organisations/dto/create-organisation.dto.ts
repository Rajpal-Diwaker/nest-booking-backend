import { isNotEmpty, IsNotEmpty } from 'class-validator';

export class CreateOrganisationDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  image: string;
}
