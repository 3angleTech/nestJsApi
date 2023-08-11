import { Email } from './email.service.interface';

/**
 * Provides the driver for the e-mail provider.
 */
export interface IEmailProviderDriver {

  /**
   * Sends the email.
   * @param email The target email.
   */
  sendEmail(email: Email): Promise<void>;
}
export const EMAIL_PROVIDER_DRIVER = 'EMAIL_PROVIDER_DRIVER';
