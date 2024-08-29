import { Module } from '@nestjs/common';

import { EmailsModule } from '~common/emails';
import { UsersModule } from '~common/users';
import { AuthModule } from '~modules/auth';

import { AccountsController } from './controllers/accounts.controller';
import { AccountEmailsService } from './services/account-emails.service';
import { AccountsService } from './services/accounts.service';

@Module({
  imports: [
    EmailsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [
    AccountsController,
  ],
  providers: [
    AccountEmailsService,
    AccountsService,
  ],
})
export class AccountsModule {}
