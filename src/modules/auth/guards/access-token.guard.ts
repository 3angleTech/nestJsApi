import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { SKIP_ACCESS_TOKEN_GUARD_KEY } from '../../../common/auth/skip-access-token-guard.decorator';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const skipGuard = this.reflector.getAllAndOverride<boolean>(
      SKIP_ACCESS_TOKEN_GUARD_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (skipGuard) {
      return true;
    }

    return super.canActivate(context);
  }
}
