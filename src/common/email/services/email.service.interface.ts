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
export interface IEmailService {

  /**
   * Sends a generic email message.
   * @param email The target email.
   */
  sendEmail(email: Email): Promise<void>;
}
export const EMAIL_SERVICE = 'EMAIL_SERVICE';
