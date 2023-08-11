import { Module } from '@nestjs/common';
import { USERS_SERVICE } from './services/users.interface';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    {
      provide: USERS_SERVICE,
      useClass: UsersService,
    },
  ],
  exports: [
    USERS_SERVICE,
  ],
})
export class UsersModule {
}
