import { Test, TestingModule } from '@nestjs/testing';
import { MockEmailProviderDriver } from '../src/common/emails/services/mock-email-provider-driver';
import { VerboseTestLogger } from './verbose-test-logger';

describe('Users Service (e2e)', () => {
  let service: MockEmailProviderDriver;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [MockEmailProviderDriver],
    }).compile();

    moduleFixture.useLogger(new VerboseTestLogger());

    service = moduleFixture.get<MockEmailProviderDriver>(MockEmailProviderDriver);
  });

  it('Should be running.', async () => {
    await service.sendEmail({
      fromAddress: 'a@gmail.com',
      toAddress: 'a@3angle.tech',
      templateId: '123',
      templateParams: {
        name: 'Catalin',
      },
    });
  });
});
