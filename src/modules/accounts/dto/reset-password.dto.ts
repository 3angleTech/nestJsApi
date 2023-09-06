import { IsNotEmpty, Matches, MinLength } from 'class-validator';
import { PASSWORD_MIN_LENGTH, PASSWORD_PATTERN } from '~common/users';

export class ResetPasswordDto {
  @IsNotEmpty()
  token: string;

  @MinLength(PASSWORD_MIN_LENGTH, {
    message: 'SERVER_ERROR.USER.PASSWORD_MIN_LENGTH',
    context: { minLength: 8 },
  })
  @Matches(PASSWORD_PATTERN, {
    message: 'SERVER_ERROR.USER.PASSWORD_PATTERN',
  })
  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  confirmPassword: string;
}
