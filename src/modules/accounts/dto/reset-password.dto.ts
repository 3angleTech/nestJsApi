import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';
import { PASSWORD_MIN_LENGTH, PASSWORD_PATTERN } from '~common/users';

@Expose()
export class ResetPasswordDto {
  @ApiProperty({ example: 'token', description: 'Token' })
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 'password123', description: 'New password' })
  @MinLength(PASSWORD_MIN_LENGTH, {
    message: 'SERVER_ERROR.USER.PASSWORD_MIN_LENGTH',
    context: { minLength: 8 },
  })
  @Matches(PASSWORD_PATTERN, {
    message: 'SERVER_ERROR.USER.PASSWORD_PATTERN',
  })
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({ example: 'password123', description: 'Confirm password' })
  @IsNotEmpty()
  confirmPassword: string;
}
