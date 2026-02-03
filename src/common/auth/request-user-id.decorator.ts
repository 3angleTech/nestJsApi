import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequestUser } from './request-user';
import { Request } from 'express';

export const RequestUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const requestUser = request.user as IRequestUser | undefined;
    if (requestUser) {
      return requestUser.userId;
    }
    return null;
  },
);
