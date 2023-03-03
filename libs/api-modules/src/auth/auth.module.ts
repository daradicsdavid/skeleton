import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthGuard} from "./guards/auth.guard";
import {CaslModule} from "nest-casl";
import {userPermissions} from "../user/user.permissions";
import UserModule from "@skeleton/entities/user/user.module";

@Module({
  imports: [UserModule, CaslModule.forFeature({permissions: userPermissions})],
  controllers: [AuthController],
  providers: [AuthGuard],
  exports: [AuthGuard, UserModule]
})
export class AuthModule {
}
