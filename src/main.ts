import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.enableCors({
    origin: [
      'http://localhost:4200',
    ],
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    credentials: true,
  });
  app.setGlobalPrefix('api/v1/');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  await app.listen(Number(process.env.APP_PORT));
}
bootstrap();
