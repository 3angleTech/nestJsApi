import { registerAs } from '@nestjs/config';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Algorithm } from 'jsonwebtoken';

export interface SecurityConfiguration {
  accessTokenSecret: string;
  accessTokenExpirationTime: string;
  refreshTokenSecret: string;
  refreshTokenExpirationTime: string;
  genericTokenSecret: string;
  genericTokenExpirationTimeInHours: string;
  tokensIssuer: string;
  tokensAlgorithm: Algorithm;
}

const DEFAULT_TOKENS_ALGORITHM: Algorithm = 'HS256';

export default registerAs('security', (): SecurityConfiguration => {
  return {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
    accessTokenExpirationTime: process.env.ACCESS_TOKEN_EXPIRATION_TIME as string,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
    refreshTokenExpirationTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME as string,
    genericTokenSecret: process.env.GENERIC_TOKEN_SECRET as string,
    genericTokenExpirationTimeInHours: process.env.GENERIC_TOKEN_EXPIRATION_TIME_IN_HOURS as string,
    tokensIssuer: process.env.TOKENS_ISSUER as string,
    tokensAlgorithm: process.env.TOKENS_ALGORITHM as Algorithm || DEFAULT_TOKENS_ALGORITHM,
  };
});
