import { SetMetadata } from '@nestjs/common';

export const SKIP_ACCESS_TOKEN_GUARD_KEY = 'skipAccessTokenGuard';
export const SkipAccessTokenGuard = () =>
  SetMetadata(SKIP_ACCESS_TOKEN_GUARD_KEY, true);
