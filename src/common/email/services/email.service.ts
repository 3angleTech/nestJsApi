import { Inject, Injectable, Logger } from '@nestjs/common';

import { EMAIL_PROVIDER_DRIVER, IEmailProviderDriver } from './email-provider-driver.interface';
import { Email, IEmailService } from './email.service.interface';

@Injectable()
export class EmailService implements IEmailService {
  private readonly logger = new Logger(EmailService.name);

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
