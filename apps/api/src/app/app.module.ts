import {Module} from '@nestjs/common';
import {UserModule} from "../user/user.module";
import {AutomapperModule} from "@automapper/nestjs";
import {LoggerModule} from "nestjs-pino";
import {CaslModule} from "nest-casl";
import {Roles} from "@skeleton/common/constants/roles.enum";
import {mikro} from "@automapper/mikro";
import {EntitiesModule} from "@skeleton/entities/entities.module";
import {AuthModule} from "../auth/auth.module";
import {TodoModule} from "../todo/todo.module";

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
    AuthModule
  ],
})
export class AppModule {
}
