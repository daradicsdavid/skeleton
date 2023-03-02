import Todo from "./todo.entity";
import UserDto from "@skeleton/entities/user/user.dto";
import {AutoMap} from "@automapper/classes";

export default class TodoDto implements Pick<Todo, "id" | "title"> {
  id!: string;
  title: string;

  @AutoMap({type: () => UserDto})
  user: UserDto
}
