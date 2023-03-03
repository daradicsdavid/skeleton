import {IsNotBlank} from "../../utils/validation/is-not-blank.validator";

export default class CreateTodoRequest {

  @IsNotBlank()
  title: string;
}
