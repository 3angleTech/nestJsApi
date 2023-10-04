/* eslint-disable @typescript-eslint/no-magic-numbers */
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as supertest from 'supertest';

import { DefaultUser } from '../db/seeds/default-user';
import { AppModule } from '../src/app.module';
import { assertIsArray, assertIsObject, createTestApplication, JSON_MIME_TYPE } from './utils';

describe('Authentication tests (e2e)', () => {
  let agent: supertest.SuperAgentTest;
  let app: INestApplication;
  let payload: URLSearchParams;
  let response: supertest.Response;

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

  it('Should not be able to log in with invalid credentials', async () => {
    payload = new URLSearchParams({
      grant_type: 'password',
      username: 'INVALID_USER',
      password: 'INVALID_PASSWORD',
    });
    response = await agent.post('/api/v1/auth/token').send(payload.toString());
    expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    expect(response.type).toEqual(JSON_MIME_TYPE);
    assertIsObject(response.body);
    expect(response.body.message).toEqual('Unauthorized');
    expect(response.body.statusCode).toEqual(HttpStatus.UNAUTHORIZED);

    payload = new URLSearchParams({
      grant_type: 'password',
      username: DefaultUser.username,
      password: 'INVALID_PASSWORD',
    });
    response = await agent.post('/api/v1/auth/token').send(payload.toString());
    expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    expect(response.type).toEqual(JSON_MIME_TYPE);
    assertIsObject(response.body);
    expect(response.body.message).toEqual('Unauthorized');
    expect(response.body.statusCode).toEqual(HttpStatus.UNAUTHORIZED);

    payload = new URLSearchParams({
      grant_type: 'password',
      username: 'INVALID_USER',
      password: DefaultUser.password,
    });
    response = await agent.post('/api/v1/auth/token').send(payload.toString());
    expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    expect(response.type).toEqual(JSON_MIME_TYPE);
    assertIsObject(response.body);
    expect(response.body.message).toEqual('Unauthorized');
    expect(response.body.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
  });

  it('Should get access and refresh tokens when logged in successfully', async () => {
    payload = new URLSearchParams({
      grant_type: 'password',
      username: DefaultUser.username,
      password: DefaultUser.password,
    });
    response = await agent.post('/api/v1/auth/token').send(payload.toString());
    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.type).toEqual(JSON_MIME_TYPE);

    assertIsObject(response.body);
    expect(Object.keys(response.body).length).toEqual(2);
    expect(typeof response.body.accessToken).toEqual('string');
    expect(typeof response.body.refreshToken).toEqual('string');

    assertIsArray(response.headers['set-cookie']);
    expect(response.headers['set-cookie'].length).toEqual(2);
    const nameRE = new RegExp('^[a-zA-Z0-9]+=');
    response.headers['set-cookie'].forEach((setCookieString: string): void => {
      const nameMatch = setCookieString.match(nameRE);
      expect(nameMatch).not.toBeNull();
      if (nameMatch) {
        expect(nameMatch[0] === 'accessToken=' || nameMatch[0] === 'refreshToken=').toBeTruthy();
      }
      expect(setCookieString).toContain('HttpOnly');
    });
  });

  it('Should return account details when logged in.', async () => {
    payload = new URLSearchParams({
      grant_type: 'password',
      username: DefaultUser.username,
      password: DefaultUser.password,
    });
    response = await agent.post('/api/v1/auth/token').send(payload.toString());
    expect(response.statusCode).toEqual(HttpStatus.OK);

    response = await agent.get('/api/v1/account/me').send(agent);
    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.type).toEqual(JSON_MIME_TYPE);
    assertIsObject(response.body);
    expect(response.body.username).toEqual(DefaultUser.username);
    expect(typeof response.body.id).toEqual('string');

    response = await agent.get('/api/v1/auth/logout').send();
    expect(response.body.message).toEqual('Logged out successfully');
    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.type).toEqual(JSON_MIME_TYPE);
    assertIsObject(response.body);
    expect(Object.keys(response.body).length).toEqual(1);
    expect(response.body.message).toEqual('Logged out successfully');

    response = await agent.get('/api/v1/account/me').send(agent);
    expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    expect(response.type).toEqual(JSON_MIME_TYPE);
    assertIsObject(response.body);
    expect(Object.keys(response.body).length).toEqual(2);
    expect(response.body.message).toEqual('Unauthorized');
    expect(response.body.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
  });
});
