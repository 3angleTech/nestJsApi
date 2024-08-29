import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Email, EmailsService } from '~common/emails';
import { UsersService } from '~common/users';
import { EmailConfiguration } from '~config/email.config';
import { EnvironmentConfiguration } from '~config/environment.config';
import { SecurityConfiguration } from '~config/security.config';
import { User } from '~entities/index';

import { AuthService } from '~modules/auth';

/**
 * Provides the email service used for actions like activation, sign up, or password reset.
 */
export interface IAccountEmailsService {
  sendForgotPasswordEmail(userEmail: string): Promise<void>;
}

@Injectable()
export class AccountEmailsService implements IAccountEmailsService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly emailService: EmailsService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
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
    const encodedToken: string = encodeURIComponent(token);
    return `${environment.clientBaseUrl}/account/reset-password?token=${encodedToken}`;
  }
}
