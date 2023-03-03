import {IsNotBlank} from "../../utils/validation/is-not-blank.validator";

export class LoginDto {
  @IsNotBlank()
  name: string;
}
