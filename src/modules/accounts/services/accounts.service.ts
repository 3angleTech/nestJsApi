import { BadRequestException, Inject, UnauthorizedException } from '@nestjs/common';

import { IUsersService, User, USERS_SERVICE } from '~common/users';
import { encrypt } from '~common/crypto';
import { AUTH_SERVICE, IAuthService, JwtPayload } from '~modules/auth';

import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { IAccountsService } from './accounts.interface';
import { ACCOUNT_EMAILS_SERVICE, IAccountEmailsService } from './account-emails.interface';

export class AccountsService implements IAccountsService {
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
    if (user && user.isActive) {
      return this.accountEmailsService.sendForgotPasswordEmail(user.email);
    }
  }

  public async resetPassword(dto: ResetPasswordDto): Promise<void> {
    let userId: string;
    try {
      const payload: JwtPayload = await this.authService.verifyGenericToken(dto.token);
      userId = payload.sub;
    } catch (err) {
      throw new UnauthorizedException();
    }

    const user: User = await this.usersService.findByIdOrFail(userId);

    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException('SERVER_ERROR.USER.PASSWORDS_DO_NOT_MATCH');
    }

    const passwordHash = await encrypt(dto.newPassword);
    await this.usersService.update(user.id, {
      password: passwordHash,
    });
  }
}
