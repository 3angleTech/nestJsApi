import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { OAuth2GrantType } from '../dto/auth.dto';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const grantType = request.body.grant_type;
    if (grantType === OAuth2GrantType.Password) {
      return true;
    }

    return super.canActivate(context);
  }
}
