import {forwardRef, Module} from "@nestjs/common";
import UserRepository from "./user.repository";
import UserService from "./user.service";
import UserAutoMapperProfile from "./user.auto-mapper-profile";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import User from "./user.entity";
import TodoModule from "@skeleton/entities/todo/todo.module";


@Module({
  providers: [UserService, UserRepository, UserAutoMapperProfile],
  exports: [MikroOrmModule.forFeature({entities: [User]}), UserService, UserRepository, UserAutoMapperProfile],
  imports: [MikroOrmModule.forFeature({entities: [User]}), forwardRef(() => TodoModule)]
})
export default class UserModule {
}
