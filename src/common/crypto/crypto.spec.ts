import { encrypt, verify } from './crypto';

describe('Crypto Service', () => {
  it('Should encrypt and verify a string', async () => {
    const original = 'test132_21';
    const encrypted = await encrypt(original);
    expect(encrypted).not.toBe(original);

    const result = await verify(original, encrypted);
    expect(result).toBe(true);
  });
});
