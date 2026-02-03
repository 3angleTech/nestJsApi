import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as supertest from 'supertest';
import { Test as SuperTest } from 'supertest';
import { Server } from 'http';

import { AppModule } from './../src/app.module';
import { assertIsObject, createTestApplication, JSON_MIME_TYPE } from './utils';
import TestAgent from 'supertest/lib/agent';

describe('AppController (e2e)', () => {
  let agent: TestAgent<SuperTest>;
  let app: INestApplication;

  afterAll(async () => {
    await app.close();
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = createTestApplication(moduleFixture);
    await app.init();
  });

  beforeEach(() => {
    const server = app.getHttpServer() as Server;
    agent = supertest.agent(server);
  });

  it('Should be running.', async () => {
    const response = await agent.get('/api/v1/health-check');
    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.type).toEqual(JSON_MIME_TYPE);
    expect(typeof response.body).toBe('object');

    assertIsObject(response.body);
    expect(response.body['status']).toBe('Running');
    expect(response.body['isDatabaseInitialized']).toBe(true);
  });
});
