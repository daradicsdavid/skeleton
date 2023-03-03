import {
  CanActivate,
  ExecutionContext,
  Injectable
} from "@nestjs/common";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import UserService from "@skeleton/entities/user/user.service";

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private readonly service: UserService, @InjectMapper() private readonly mapper: Mapper) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const id: string = request.userId;
    if (!id) return false;
    const user = await this.service.find(id);
    if (!user) return false;
    request.user = user
    return true;
  }
}
