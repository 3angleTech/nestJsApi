import { Controller, Get } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { SkipAccessTokenGuard } from '~common/auth';

@Controller('health-check')
export class HealthCheckController {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  @SkipAccessTokenGuard()
  @Get()
  healthCheck() {
    const isDatabaseInitialized = this.dataSource.isInitialized;

    return {
      status: 'Running',
      timestamp: new Date().toISOString(),
      isDatabaseInitialized: isDatabaseInitialized,
    };
  }
}
