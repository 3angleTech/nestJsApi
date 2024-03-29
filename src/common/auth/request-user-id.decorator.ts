import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequestUser } from './request-user';

export const RequestUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    const requestUser: IRequestUser = request.user;
    if (requestUser) {
      return requestUser.userId;
    }
    return null;
  },
);
