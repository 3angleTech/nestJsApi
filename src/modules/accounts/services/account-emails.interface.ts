/**
 * Provides the email service used for actions like activation, sign up, or password reset.
 */
export interface IAccountEmailsService {
  sendForgotPasswordEmail(userEmail: string): Promise<void>;
}
export const ACCOUNT_EMAILS_SERVICE = 'ACCOUNT_EMAILS_SERVICE';
