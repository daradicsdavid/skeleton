import {Permissions, Actions} from "nest-casl";
import {InferSubjects} from "@casl/ability";
import UserDto from "@skeleton/entities/user/user.dto";
import {Roles} from "@skeleton/common/constants/roles.enum";


export type Subjects = InferSubjects<typeof UserDto>;

export const userPermissions: Permissions<Roles, Subjects, Actions> = {
  admin({can}) {
    can(Actions.read, UserDto);
    can(Actions.update, UserDto);
    can(Actions.create, UserDto);
    can(Actions.delete, UserDto);
  }
};
