import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as supertest from 'supertest';

import { AppModule } from './../src/app.module';
import { assertIsObject, createTestApplication, JSON_MIME_TYPE } from './utils';

describe('AppController (e2e)', () => {
  let agent: supertest.SuperAgentTest;
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
    agent = supertest.agent(app.getHttpServer());
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
