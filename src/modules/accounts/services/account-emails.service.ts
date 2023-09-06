import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Email, EMAILS_SERVICE, IEmailsService } from '~common/emails';
import { IUsersService, User, USERS_SERVICE } from '~common/users';
import { EmailConfiguration } from '~config/email.config';
import { EnvironmentConfiguration } from '~config/environment.config';
import { SecurityConfiguration } from '~config/security.config';
import { AUTH_SERVICE, IAuthService } from '~modules/auth';

import { IAccountEmailsService } from './account-emails.interface';

@Injectable()
export class AccountEmailsService implements IAccountEmailsService {
  // eslint-disable-next-line max-params
  constructor(
    @Inject(EMAILS_SERVICE)
    private readonly emailService: IEmailsService,
    @Inject(AUTH_SERVICE)
    private readonly authService: IAuthService,
    @Inject(USERS_SERVICE)
    private readonly usersService: IUsersService,
    private readonly configService: ConfigService,
  ) {}

  public async sendForgotPasswordEmail(userEmail: string): Promise<void> {
    const user = await this.usersService.findByEmail(userEmail);
    if (!user || !user.email) {
      return;
    }

    const emailConfiguration = <EmailConfiguration> this.configService.get('email');
    const email: Email = {
      fromAddress: emailConfiguration.fromAddress,
      toAddress: user.email,
      templateId: emailConfiguration.templateIds.forgotPassword,
      templateParams: {
        name: user.firstName || user.email,
        passwordResetUrl: await this.getPasswordResetUrl(user),
      },
    };

    await this.emailService.sendEmail(email);
  }

  private async getPasswordResetUrl(user: User): Promise<string> {
    const expirationTimeInHours = this.configService.get<SecurityConfiguration>('security')?.genericTokenExpirationTimeInHours;
    const token = await this.authService.getGenericToken(user.id, user.email, `${expirationTimeInHours}h`);

    const environment = <EnvironmentConfiguration> this.configService.get('environment');
    return `${environment.clientBaseUrl}/account/reset-password?token=${token}`;
  }
}
