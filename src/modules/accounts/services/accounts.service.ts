import { BadRequestException, Inject, Logger, UnauthorizedException } from '@nestjs/common';

import { IUsersService, User, USERS_SERVICE } from '~common/users';
import { encrypt } from '~common/crypto';
import { AUTH_SERVICE, IAuthService, JwtPayload } from '~modules/auth';

import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { IAccountsService } from './accounts.interface';
import { ACCOUNT_EMAILS_SERVICE, IAccountEmailsService } from './account-emails.interface';

const USER_FORGOT_PASSWORD_NO_USER = 'SERVER_ERROR.USER.FORGOT_PASSWORD_NO_USER';
const USER_FORGOT_PASSWORD_INACTIVE_USER = 'SERVER_ERROR.USER.FORGOT_PASSWORD_INACTIVE_USER';
const USER_PASSWORDS_DO_NOT_MATCH = 'SERVER_ERROR.USER.PASSWORDS_DO_NOT_MATCH';

export class AccountsService implements IAccountsService {
  private readonly logger = new Logger(AccountsService.name);

  constructor(
    @Inject(ACCOUNT_EMAILS_SERVICE)
    private readonly accountEmailsService: IAccountEmailsService,
    @Inject(AUTH_SERVICE)
    private readonly authService: IAuthService,
    @Inject(USERS_SERVICE)
    private readonly usersService: IUsersService,
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
