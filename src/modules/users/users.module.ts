import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { UsersModule as CommonUsersModule } from '~common/users';

@Module({
  imports: [
    CommonUsersModule,
  ],
  controllers: [
    UsersController,
  ],
})
export class UsersModule {}
