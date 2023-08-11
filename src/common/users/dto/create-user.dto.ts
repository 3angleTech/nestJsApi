import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export const USERNAME_MIN_LENGTH = 3;
export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=(.*[a-z])+)(?=(.*\d)+)(?=(.*\W)+)(?!.*\s)./;

export class CreateUserDto {
  @MinLength(USERNAME_MIN_LENGTH)
  @IsNotEmpty()
  username: string;

  @MinLength(PASSWORD_MIN_LENGTH)
  @Matches(PASSWORD_PATTERN, { message: 'SERVER_ERROR.USER.PASSWORD_PATTERN' })
  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  firstName: string;

  lastName: string;
}
