//user.decorator.ts
import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const CognitoId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.userId;
  }
);
