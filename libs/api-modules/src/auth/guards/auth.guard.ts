import {Injectable, CanActivate, ExecutionContext} from "@nestjs/common";
import CookieUtils from "../cookie-utils";

@Injectable()
export class AuthGuard implements CanActivate {

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = CookieUtils.extractAccessToken(request)
    if (!token) return false
    request.userId = token;
    return true
  }
}
