import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '~modules/users';

import { AuthController } from './controllers/auth.controller';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AccessTokenStrategy } from './services/access-token.strategy';
import { AUTH_SERVICE } from './services/auth.interface';
import { AuthService } from './services/auth.service';
import { RefreshTokenStrategy } from './services/refresh-token.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
    AccessTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    RefreshTokenStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
