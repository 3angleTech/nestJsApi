import { Inject, Injectable, Logger } from '@nestjs/common';
import { Email, IEmailsService } from './emails.service.interface';
import { EMAIL_PROVIDER_DRIVER, IEmailProviderDriver } from './email-provider-driver.interface';

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
