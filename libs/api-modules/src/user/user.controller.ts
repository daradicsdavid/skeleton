import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Query, UsePipes,
  ValidationPipe
} from "@nestjs/common";
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {Actions} from "nest-casl";
import {Controller} from "../utils/custom-decorators/controller";
import UserService from "@skeleton/entities/user/user.service";
import UserDto from "@skeleton/entities/user/user.dto";
import {AuthorizedGuard} from "../auth/guards/authorized.guard";
import {ApiOkResponsePaginated} from "../utils/custom-decorators/api-ok-response-paginated";
import {PageOptionsDto} from "@skeleton/common/pagination/page.options.dto";
import {PageDto} from "@skeleton/common/pagination/page.dto";
import CreateUserRequest from "./dto/create-user.request";
import User from "@skeleton/entities/user/user.entity";
import UpdateUserRequest from "./dto/update-user.request";


@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService, @InjectMapper() readonly mapper: Mapper) {
  }

  @ApiOkResponse({type: UserDto})
  @ApiOperation({operationId: "user"})
  @AuthorizedGuard(Actions.read, UserDto)
  @Get(":id")
  get(@Param("id") id: string): Promise<UserDto> {
    return this.userService.getUser(id);
  }

  @ApiOkResponsePaginated(UserDto)
  @ApiOperation({operationId: "users"})
  @Get("")
  @UsePipes(new ValidationPipe({transform: true}))
  @AuthorizedGuard(Actions.read, UserDto)
  async list(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<UserDto>> {
    return this.userService.getUsers(pageOptionsDto);
  }

  @ApiOkResponse({type: UserDto})
  @ApiOperation({operationId: "createUser"})
  @Post("")
  @AuthorizedGuard(Actions.create, UserDto)
  async create(@Body() createUserRequest: CreateUserRequest): Promise<UserDto> {
    const user = await this.userService.create(createUserRequest.name, createUserRequest.role);
    return this.mapper.map(user, User, UserDto);
  }

  @ApiOkResponse({type: UserDto})
  @ApiOperation({operationId: "updateUser"})
  @Post(":id")
  @AuthorizedGuard(Actions.create, UserDto)
  async update(@Body() updateUserRequest: UpdateUserRequest, @Param("id") id: string): Promise<UserDto> {
    const user = await this.userService.update(id, updateUserRequest.name);
    return this.mapper.map(user, User, UserDto);
  }

  @ApiOkResponse()
  @ApiOperation({operationId: "removeUser"})
  @Delete(":id")
  @AuthorizedGuard(Actions.delete, UserDto)
  async remove(@Param("id") id: string) {
    await this.userService.removeUser(id);
  }
}
