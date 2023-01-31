import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { AccountsController } from './controllers/accounts.controller';

@Module({
  imports: [UsersModule],
  controllers: [AccountsController],
})
export class AccountsModule {}
