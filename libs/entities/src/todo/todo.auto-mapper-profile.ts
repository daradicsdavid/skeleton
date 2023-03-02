import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import type {Mapper} from "@automapper/core";
import {createMap} from "@automapper/core";
import {Injectable} from "@nestjs/common";
import Todo from "./todo.entity";
import TodoDto from "./todo.dto";

@Injectable()
export default class TodoAutoMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, Todo, TodoDto)
    };
  }
}
