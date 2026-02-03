import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IRequestUser } from './request-user';

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IRequestUser | null => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user as IRequestUser ?? null;
  },
);
