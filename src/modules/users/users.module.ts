import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { USERS_SERVICE } from './services/users.interface';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: USERS_SERVICE,
      useClass: UsersService,
    },
  ],
  controllers: [UsersController],
  exports: [
    USERS_SERVICE,
  ],
})
export class UsersModule {}
