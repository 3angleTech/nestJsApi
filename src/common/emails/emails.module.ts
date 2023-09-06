import { Module } from '@nestjs/common';

import { UsersModule } from '~common/users';

import { EMAIL_PROVIDER_DRIVER } from './services/email-provider-driver.interface';
import { EmailsService } from './services/emails.service';
import { EMAILS_SERVICE } from './services/emails.service.interface';
import { SendGridEmailProviderDriver } from './services/sendgrid-email-provider-driver';

@Module({
  imports: [
    UsersModule,
  ],
  providers: [
    {
      provide: EMAIL_PROVIDER_DRIVER,
      useClass: SendGridEmailProviderDriver,
    },
    {
      provide: EMAILS_SERVICE,
      useClass: EmailsService,
    },
  ],
  controllers: [],
  exports: [
    EMAILS_SERVICE,
  ],
})
export class EmailsModule {}
