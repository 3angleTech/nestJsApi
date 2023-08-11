import { Module } from '@nestjs/common';

import { EmailModule } from '~common/email';
import { UsersModule } from '~common/users';
import { AuthModule } from '~modules/auth';

import { AccountsController } from './controllers/accounts.controller';
import { ACCOUNT_EMAILS_SERVICE } from './services/account-emails.interface';
import { AccountEmailsService } from './services/account-emails.service';
import { ACCOUNTS_SERVICE } from './services/accounts.interface';
import { AccountsService } from './services/accounts.service';

@Module({
  imports: [
    EmailModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [
    AccountsController,
  ],
  providers: [
    {
      provide: ACCOUNT_EMAILS_SERVICE,
      useClass: AccountEmailsService,
    },
    {
      provide: ACCOUNTS_SERVICE,
      useClass: AccountsService,
    },
  ],
})
export class AccountsModule {}
