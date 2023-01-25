import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfiguration from './config/db.config';
import environmentConfig from './config/environment.config';
import securityConfig from './config/security.config';

import { AccountsModule } from './modules/accounts/accounts.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfiguration, environmentConfig, securityConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('db'),
      }),
    }),
    AccountsModule,
    AuthModule,
    HealthCheckModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
