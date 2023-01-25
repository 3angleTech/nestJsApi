import { registerAs } from '@nestjs/config';

export default registerAs('environment', () => ({
  isDevMode: process.env.NODE_ENV === 'development',
}));
