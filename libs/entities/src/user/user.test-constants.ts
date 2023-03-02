import UserDto from "@skeleton/entities/user/user.dto";
import {Roles} from "@skeleton/common/constants/roles.enum";

export const newUser: Partial<UserDto> = {
  name: "newUser",
  role: Roles.admin
}

export const existingUser: Partial<UserDto> = {
  name: "existingUser",
  role: Roles.admin
}

export const existingUserAfterEdit: Partial<UserDto> = {
  ...existingUser,
  name: "existingUserAfterUpdate"
}

export const existingUserWillDelete: Partial<UserDto> = {
  name: "existingUserWillDelete",
  role: Roles.admin
}
