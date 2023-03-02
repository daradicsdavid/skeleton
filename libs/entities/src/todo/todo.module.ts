import {forwardRef, Module} from "@nestjs/common";
import TodoRepository from "./todo.repository";
import TodoService from "./todo.service";
import TodoAutoMapperProfile from "./todo.auto-mapper-profile";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import Todo from "./todo.entity";
import UserModule from "@skeleton/entities/user/user.module";


@Module({
  providers: [TodoService, TodoRepository, TodoAutoMapperProfile],
  exports: [MikroOrmModule.forFeature({entities: [Todo]}), TodoService, TodoRepository, TodoAutoMapperProfile],
  imports: [MikroOrmModule.forFeature({entities: [Todo]}), forwardRef(() => UserModule)]
})
export default class TodoModule {
}
