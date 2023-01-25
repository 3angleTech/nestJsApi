import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | null => {
    return ctx.switchToHttp().getRequest().user;
  },
);
