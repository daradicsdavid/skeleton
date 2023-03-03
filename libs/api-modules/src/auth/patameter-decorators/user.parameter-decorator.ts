//user.decorator.ts
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import User from "@skeleton/entities/user/user.entity";

export const UserParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
