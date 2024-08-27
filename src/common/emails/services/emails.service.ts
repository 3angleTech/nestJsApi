import { Inject, Injectable, Logger } from '@nestjs/common';

import { EMAIL_PROVIDER_DRIVER, IEmailProviderDriver } from './email-provider-driver.interface';

/**
 * Provides generic email template parameters.
 */
export interface Email {
  fromAddress: string;
  toAddress: string;
  templateId: string;
  templateParams: Record<string, string | number | boolean>;
}

/**
 * Provides the email service used for actions like activation, sign up, or password reset.
 */
export interface IEmailsService {

  /**
   * Sends a generic email message.
   * @param email The target email.
   */
  sendEmail(email: Email): Promise<void>;
}
export const EMAILS_SERVICE = 'EMAIL_SERVICE';

@Injectable()
export class EmailsService implements IEmailsService {
  private readonly logger = new Logger(EmailsService.name);

  constructor(
    @Inject(EMAIL_PROVIDER_DRIVER)
    private readonly emailDriver: IEmailProviderDriver,
  ) { }

  public async sendEmail(email: Email): Promise<void> {
    try {
      await this.emailDriver.sendEmail(email);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
