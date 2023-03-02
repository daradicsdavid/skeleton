import {IsNotBlank} from "../../utils/validation/is-not-blank.validator";

export default class UpdateUserRequest {
  @IsNotBlank()
  name: string;
}
