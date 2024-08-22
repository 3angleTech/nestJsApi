import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });
  app.enableCors({
    origin: [
      'http://localhost:4200',
    ],
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH', 'OPTIONS'],
    credentials: true,
  });
  app.setGlobalPrefix('api/v1/');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true, // This could be removed
  });
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(Number(process.env.APP_PORT));
  // await app.listen(3001);
}

bootstrap();
