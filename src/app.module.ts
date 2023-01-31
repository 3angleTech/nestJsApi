import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountsModule } from '~modules/accounts';
import { AuthModule } from '~modules/auth';
import { HealthCheckModule } from '~modules/health-check';
import { UsersModule } from '~modules/users';

import databaseConfiguration from './config/db.config';
import environmentConfig from './config/environment.config';
import securityConfig from './config/security.config';

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
