import { registerAs } from '@nestjs/config';

export default registerAs('security', () => ({
  jwtTokenExpirationTimeInSec: process.env.JWT_TOKEN_EXPIRATION_TIME_IN_SEC,
  jwtSecret: process.env.JWT_SECRET,
}));
