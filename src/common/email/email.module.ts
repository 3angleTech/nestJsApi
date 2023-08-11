import { Module } from '@nestjs/common';

import { UsersModule } from '~common/users';

import { EMAIL_PROVIDER_DRIVER } from './services/email-provider-driver.interface';
import { EmailService } from './services/email.service';
import { EMAIL_SERVICE } from './services/email.service.interface';
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
      provide: EMAIL_SERVICE,
      useClass: EmailService,
    },
  ],
  controllers: [],
  exports: [
    EMAIL_SERVICE,
  ],
})
export class EmailModule {}
