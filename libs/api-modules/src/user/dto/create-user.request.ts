import {IsEnum} from "class-validator";
import {Roles} from "@skeleton/common/constants/roles.enum";
import {IsNotBlank} from "../../utils/validation/is-not-blank.validator";

export default class CreateUserRequest {

  @IsNotBlank()
  name: string;

  @IsEnum(Roles)
  role: Roles;
}
