import {IsNotBlank} from "../../utils/validation/is-not-blank.validator";

export default class UpdateTodoRequest {
  @IsNotBlank()
  title: string;
}
