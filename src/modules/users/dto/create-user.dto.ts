/* eslint-disable indent*/
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

const MIN_USERNAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 8;

export class CreateUserDto {
  @MinLength(MIN_USERNAME_LENGTH)
  @IsNotEmpty()
  username: string;

  @MinLength(MIN_PASSWORD_LENGTH)
  @Matches(
    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s)./,
    {
      message:
        'Password should contain at least one upper case and one lower case letter, one digit and one special character!',
    },
  )
  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  firstName: string;

  lastName: string;
}
