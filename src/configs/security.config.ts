import { registerAs } from '@nestjs/config';

const DEFAULT_TOKENS_ALGORITHM = 'HS256';

export default registerAs('security', () => ({
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpirationTime: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpirationTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
  tokensIssuer: process.env.TOKENS_ISSUER,
  tokensAlgorithm: process.env.TOKENS_ALGORITHM || DEFAULT_TOKENS_ALGORITHM,
}));
