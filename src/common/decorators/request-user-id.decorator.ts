import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUser } from '../interfaces/request-user';

export const RequestUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    const requestUser: RequestUser = request.user;
    if (requestUser) {
      return requestUser.userId;
    }
    return null;
  },
);
