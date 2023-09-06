import { Injectable, Logger } from '@nestjs/common';
import { IEmailProviderDriver } from './email-provider-driver.interface';
import { Email } from './emails.service.interface';

@Injectable()
export class MockEmailProviderDriver implements IEmailProviderDriver {
  private readonly logger = new Logger(MockEmailProviderDriver.name);

  public sendEmail(email: Email): Promise<void> {
    this.logger.debug(email);
    return Promise.resolve();
  }
}
