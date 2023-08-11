import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';

import { EmailConfiguration } from '~config/email.config';

import { IEmailProviderDriver } from './email-provider-driver.interface';
import { Email } from './email.service.interface';

const SendGridMail = require('@sendgrid/mail');

@Injectable()
export class SendGridEmailProviderDriver implements IEmailProviderDriver {

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.setApiKey();
  }

  private setApiKey(): void {
    const serviceApiKey = this.configService.get<EmailConfiguration>('email')?.serviceApiKey;
    SendGridMail.setApiKey(serviceApiKey);
  }

  public async sendEmail(email: Email): Promise<void> {
    const message: MailDataRequired = {
      to: email.toAddress,
      from: email.fromAddress,
      templateId: email.templateId,
      dynamicTemplateData: email.templateParams,
    };

    await SendGridMail.send(message).then(
      () => {},
      (reason) => {
        throw reason;
      });
  }
}
