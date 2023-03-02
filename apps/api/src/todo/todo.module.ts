import {Module} from "@nestjs/common";
import {TodoController} from "./todo.controller";
import OrmTodoModule from "@skeleton/entities/todo/todo.module";
import {CaslModule} from "nest-casl";
import {todoPermissions} from "./todo.permissions";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [TodoController],
  imports: [CaslModule.forFeature({permissions: todoPermissions}), OrmTodoModule, AuthModule]
})
export class TodoModule {
}
