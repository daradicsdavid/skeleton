import User from "./user.entity";
import {Roles} from "@skeleton/common/constants/roles.enum";

export default class UserDto implements Pick<User, "id" | "name" | "role"> {
  id: string;
  name: string;
  role: Roles;
}
