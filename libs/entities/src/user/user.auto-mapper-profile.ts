import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import type {Mapper} from "@automapper/core";
import {createMap} from "@automapper/core";
import {Injectable} from "@nestjs/common";
import User from "./user.entity";
import UserDto from "./user.dto";

@Injectable()
export default class UserAutoMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, User, UserDto)
    };
  }
}
