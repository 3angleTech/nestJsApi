import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AccountController } from './controllers/account.controller';

@Module({
  imports: [UsersModule],
  controllers: [AccountController],
})
export class AccountModule {}
