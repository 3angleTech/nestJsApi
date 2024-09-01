import { Module } from '@nestjs/common';

import { UsersModule } from '~common/users';

import { EmailsService } from './services/emails.service';
import { SendGridEmailProviderDriver } from './services/sendgrid-email-provider-driver';
import { EMAIL_PROVIDER_DRIVER } from './services/email-provider-driver.interface';
import { MockEmailProviderDriver } from './services/mock-email-provider-driver';

const isTestEnv = process.env.NODE_ENV === 'test';

@Module({
  imports: [
    UsersModule,
  ],
  providers: [
    {
      provide: EMAIL_PROVIDER_DRIVER,
      useClass: isTestEnv ? MockEmailProviderDriver : SendGridEmailProviderDriver,
    },
    EmailsService,
  ],
  controllers: [],
  exports: [
    EmailsService,
  ],
})
export class EmailsModule {}
