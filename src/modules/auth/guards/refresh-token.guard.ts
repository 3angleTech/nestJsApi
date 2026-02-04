import { ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { OAuth2GrantType } from '../dto/auth.dto';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const body = request.body as Record<string, unknown>;
    const grantType = body?.grant_type as OAuth2GrantType;
    if (grantType === OAuth2GrantType.Password) {
      return true;
    }

    return super.canActivate(context);
  }
}
