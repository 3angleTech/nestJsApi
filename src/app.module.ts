import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import databaseConfiguration from './configs/db.config';
import environmentConfig from './configs/environment.config';
import securityConfig from './configs/security.config';
import { HealthCheckModule } from './health-check/health-check.module';
import { UsersModule } from './users/users.module';

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
    AccountModule,
    AuthModule,
    HealthCheckModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
