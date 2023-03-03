import {Module} from '@nestjs/common';
import {AutomapperModule} from "@automapper/nestjs";
import {LoggerModule} from "nestjs-pino";
import {CaslModule} from "nest-casl";
import {Roles} from "@skeleton/common/constants/roles.enum";
import {mikro} from "@automapper/mikro";
import {EntitiesModule} from "@skeleton/entities/entities.module";
import {HealthModule} from "../health/health.module";
import {UserModule} from "@skeleton/api-modules/user/user.module";
import {TodoModule} from "@skeleton/api-modules/todo/todo.module";
import {AuthModule} from "@skeleton/api-modules/auth/auth.module";

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: mikro()
    }),
    LoggerModule.forRoot({
      exclude: ["/health"]
    }),
    CaslModule.forRoot<Roles>({}),
    EntitiesModule,
    UserModule,
    TodoModule,
    AuthModule,
    HealthModule
  ],
})
export class AppModule {
}
