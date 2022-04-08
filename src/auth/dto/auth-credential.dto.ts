import {
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Organisation } from '../../organisations/organisations.entity';
import { UserRole } from '../user-role.enum';

export class AuthSignInDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}

export class AuthCredentialsDTO extends AuthSignInDTO {
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  organisation: Organisation;
}
