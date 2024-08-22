import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export const USERNAME_MIN_LENGTH = 3;
export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=(.*[a-z])+)(?=(.*\d)+)(?=(.*\W)+)(?!.*\s)./;

@Expose()
export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'Username' })
  @MinLength(USERNAME_MIN_LENGTH)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password123', description: 'Password' })
  @MinLength(PASSWORD_MIN_LENGTH)
  @Matches(PASSWORD_PATTERN, { message: 'SERVER_ERROR.USER.PASSWORD_PATTERN' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'abc@gmail.com', description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  lastName: string;
}
