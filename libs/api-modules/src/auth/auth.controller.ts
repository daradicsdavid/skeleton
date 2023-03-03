import {
  Body,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import {LoginDto} from "./dto/login.dto";

import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {UserParam} from "./patameter-decorators/user.parameter-decorator";
import {UserGuard} from "./guards/user.guard";
import {AuthGuard} from "./guards/auth.guard";
import {Controller} from "../utils/custom-decorators/controller";
import UserService from "@skeleton/entities/user/user.service";
import UserDto from "@skeleton/entities/user/user.dto";
import CookieUtils from "./cookie-utils";
import User from "@skeleton/entities/user/user.entity";
import {FastifyReply} from 'fastify'

@Controller("auth")
export class AuthController {

  constructor(private userService: UserService, @InjectMapper() private readonly mapper: Mapper) {
  }


  @ApiOkResponse({type: UserDto})
  @ApiOperation({operationId: "login"})
  @ApiUnauthorizedResponse({type: UnauthorizedException})
  @Post("/login")
  async login(@Body() loginDto: LoginDto, @Res({passthrough: true}) response: FastifyReply): Promise<UserDto> {
    const user = await this.userService.findByName(loginDto.name);
    CookieUtils.setAccessToken(response, user.id);
    return this.mapper.map(user, User, UserDto);
  }


  @ApiOkResponse()
  @ApiOperation({operationId: "logout"})
  @ApiUnauthorizedResponse({type: UnauthorizedException})
  @Post("/logout")
  @UseGuards(AuthGuard)
  async logout(@Req() request: Request, @Res({passthrough: true}) response: FastifyReply) {
    CookieUtils.clearTokenCookie(response);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    request.accessToken = undefined;
    return;
  }


  @ApiOkResponse({type: UserDto})
  @ApiOperation({operationId: "me"})
  @UseGuards(AuthGuard, UserGuard)
  @Get("/me")
  async me(@UserParam() user): Promise<UserDto> {
    return this.mapper.map(user, User, UserDto);
  }
}
