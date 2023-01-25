import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AuthService } from './services/auth.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({})],
  providers: [
    AuthService,
    AccessTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    RefreshTokenStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
