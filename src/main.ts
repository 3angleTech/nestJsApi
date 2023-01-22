import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.setGlobalPrefix('api/v1/');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(Number(process.env.APP_PORT));
}
bootstrap();
