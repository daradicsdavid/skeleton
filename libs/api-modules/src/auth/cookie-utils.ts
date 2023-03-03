import {FastifyReply, FastifyRequest} from "fastify";

export default class CookieUtils {
  static cookieOptions = () => ({secure: true, httpOnly: true, maxAge: 60 * 1000, sameSite: true, path: "/"});

  static accessTokenKey = "access-token";

  static setAccessToken = (response: FastifyReply, accessToken: string) => {
    response.cookie(CookieUtils.accessTokenKey, accessToken, CookieUtils.cookieOptions());
  };


  static clearTokenCookie = (response: FastifyReply) => {
    response.clearCookie(CookieUtils.accessTokenKey, CookieUtils.cookieOptions());
  };

  static extractAccessToken(request: FastifyRequest): string | null {
    return request.cookies[CookieUtils.accessTokenKey];
  }
}
