import {Permissions, Actions} from "nest-casl";
import {InferSubjects} from "@casl/ability";
import {Roles} from "@skeleton/common/constants/roles.enum";
import Todo from "@skeleton/entities/todo/todo.entity";


export type Subjects = InferSubjects<typeof Todo>;

export const todoPermissions: Permissions<Roles, Subjects, Actions> = {
  everyone({user, can}) {
    can(Actions.manage, Todo, {'user.id': user.id});
  },

  admin({can, extend}) {
    extend(Roles.user);
    can(Actions.read, Todo);
  },
};
