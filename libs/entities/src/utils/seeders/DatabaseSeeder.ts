import {EntityManager} from '@mikro-orm/core';
import {Seeder} from '@mikro-orm/seeder';
import User from "@skeleton/entities/user/user.entity";
import {Roles} from "@skeleton/common/constants/roles.enum";
import Todo from "@skeleton/entities/todo/todo.entity";
import {
  existingUser as testExistingUser, existingUserWillDelete as testExistingUserWillDelete
} from "@skeleton/entities/user/user.test-constants";
import {
  existingTodo as testExistingTodo,
  existingTodoWillDelete as testExistingTodoWillDelete
} from "@skeleton/entities/todo/todo.test-constants";


export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const user = new User().assign({name: "user", role: Roles.user})
    const admin = new User().assign({name: "admin", role: Roles.admin})
    const existingUser = new User().assign(testExistingUser)
    const existingUserWillDelete = new User().assign(testExistingUserWillDelete)

    const userTodo = new Todo().assign({title: "userTodo", user})
    const adminTodo = new Todo().assign({title: "adminTodo", user: admin})
    const existingTodo = new Todo().assign({...testExistingTodo, user})
    const existingTodoWillDelete = new Todo().assign({...testExistingTodoWillDelete, user})
    await em.persistAndFlush([user, admin, existingUser, existingUserWillDelete, userTodo, adminTodo, existingTodo, existingTodoWillDelete])
  }
}
