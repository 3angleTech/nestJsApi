import { BadRequestException, Logger, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '~common/users';
import { User } from '~entities/index';
import { encrypt } from '~common/crypto';
import { AuthService, JwtPayload } from '~modules/auth';

import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { AccountEmailsService } from './account-emails.service';

const USER_FORGOT_PASSWORD_NO_USER = 'SERVER_ERROR.USER.FORGOT_PASSWORD_NO_USER';
const USER_FORGOT_PASSWORD_INACTIVE_USER = 'SERVER_ERROR.USER.FORGOT_PASSWORD_INACTIVE_USER';
const USER_PASSWORDS_DO_NOT_MATCH = 'SERVER_ERROR.USER.PASSWORDS_DO_NOT_MATCH';

export interface IAccountsService {
  forgotPassword(dto: ForgotPasswordDto): Promise<void>;
  resetPassword(dto: ResetPasswordDto): Promise<void>;
}

export class AccountsService implements IAccountsService {
  private readonly logger = new Logger(AccountsService.name);

  constructor(
    private readonly accountEmailsService: AccountEmailsService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
  }

  public async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const user = await this.usersService.findByEmail(dto.email);
    if (user) {
      if (user.isActive) {
        return this.accountEmailsService.sendForgotPasswordEmail(user.email);
      }
      this.logger.warn(`${USER_FORGOT_PASSWORD_INACTIVE_USER}: ${user.email}`);
    } else {
      this.logger.warn(`${USER_FORGOT_PASSWORD_NO_USER}: ${dto.email}`);
    }
  }

  public async resetPassword(dto: ResetPasswordDto): Promise<void> {
    let userId: string;
    try {
      const decodedToken = decodeURIComponent(dto.token);
      const payload: JwtPayload = await this.authService.verifyGenericToken(decodedToken);
      userId = payload.sub;
    } catch (err) {
      throw new UnauthorizedException();
    }

    const user: User = await this.usersService.findById(userId);

    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException(USER_PASSWORDS_DO_NOT_MATCH);
    }

    const passwordHash = await encrypt(dto.newPassword);
    await this.usersService.update(user.id, {
      password: passwordHash,
    });
  }
}
