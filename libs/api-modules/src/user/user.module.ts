import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import OrmUserModule from "@skeleton/entities/user/user.module";
import { CaslModule } from "nest-casl";
import { userPermissions } from "./user.permissions";

@Module({
  controllers: [UserController],
  imports: [CaslModule.forFeature({ permissions: userPermissions }), OrmUserModule]
})
export class UserModule {
}
