import { registerAs } from '@nestjs/config';

export interface EnvironmentConfiguration {
  isDevMode: boolean;
  clientBaseUrl: string;
}

export default registerAs('environment', (): EnvironmentConfiguration => {
  return {
    isDevMode: process.env.NODE_ENV === 'development',
    clientBaseUrl: process.env.CLIENT_BASE_URL as string,
  };
});
