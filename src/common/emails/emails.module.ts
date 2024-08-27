import { Module } from '@nestjs/common';

import { UsersModule } from '~common/users';

import { EMAIL_PROVIDER_DRIVER } from './services/email-provider-driver.interface';
import { EmailsService } from './services/emails.service';
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
    EmailsService,
  ],
  controllers: [],
  exports: [
    EmailsService,
  ],
})
export class EmailsModule {}
