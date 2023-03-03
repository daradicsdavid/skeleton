import {applyDecorators, UnauthorizedException, UseGuards} from "@nestjs/common";
import {AuthGuard} from "./auth.guard";
import {UserGuard} from "./user.guard";
import {AccessGuard, Actions, SubjectBeforeFilterHook, UseAbility, Request} from "nest-casl";
import {ApiUnauthorizedResponse} from "@nestjs/swagger";

export function AuthorizedGuard<SUBJECT, HOOK extends SubjectBeforeFilterHook<SUBJECT, Request>>(action: Actions, subject: new (...args) => SUBJECT, hook?: new (...args) => HOOK) {
  return applyDecorators(
    UseGuards(AuthGuard, UserGuard, AccessGuard),
    UseAbility(action, subject, hook),
    ApiUnauthorizedResponse({type: UnauthorizedException})
  );
}
