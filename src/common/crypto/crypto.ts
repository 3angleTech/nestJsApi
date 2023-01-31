import * as bcrypt from 'bcrypt';

export async function encrypt(value: string): Promise<string> {
  const salt = await bcrypt.genSalt();

  return bcrypt.hash(value, salt);
}

export function verify(original: string, encrypted: string): Promise<boolean> {
  return bcrypt.compare(original, encrypted);
}
