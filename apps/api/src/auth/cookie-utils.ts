import {Request, Response} from "express";

export default class CookieUtils {
  static cookieOptions = () => ({secure: true, httpOnly: true, maxAge: 60 * 1000, sameSite: true});

  static accessTokenKey = "access-token";

  static setAccessToken = (response: Response, accessToken: string) => {
    response.cookie(CookieUtils.accessTokenKey, accessToken, CookieUtils.cookieOptions());
  };


  static clearTokenCookie = (response: Response) => {
    response.clearCookie(CookieUtils.accessTokenKey, CookieUtils.cookieOptions());
  };

  static extractAccessToken(request: Request): string | null {
    return request.cookies[CookieUtils.accessTokenKey];
  }
}
