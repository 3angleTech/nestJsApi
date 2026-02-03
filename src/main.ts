import { ClassSerializerInterceptor, ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      json: true,
      colors: true,
    }),
  });

  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  app.setGlobalPrefix('api/v1/');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('3angleTech API')
    .setDescription('Core Business Logic API')
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  const DEFAULT_PORT = 3000;
  const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : DEFAULT_PORT;
  await app.listen(port);
}

bootstrap();
