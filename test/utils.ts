/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TestingModule } from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';

/**
 * @see bootstrap()
 */
export function createTestApplication(moduleFixture: TestingModule): INestApplication {
  const app: INestApplication = moduleFixture.createNestApplication();
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
  return app;
}

export function assertIsObject(value: unknown): asserts value is Record<any, any> {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Not an object!');
  }
}

export function assertIsArray(value: unknown): asserts value is any[] {
  if (!Array.isArray(value)) {
    throw new Error('Not an array!');
  }
}

export const JSON_MIME_TYPE = 'application/json';
