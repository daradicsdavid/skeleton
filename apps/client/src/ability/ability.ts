import {
  AbilityBuilder, AbilityClass,
  createMongoAbility,
  MongoAbility, PureAbility
} from "@casl/ability";
import {
  UserDto,
  UserDtoRoleEnum
} from "@skeleton/api-client/api";


type Actions = "read" | "create" | "delete" | "update";
type Subjects = "User" | "Todo";

export type AppAbility = MongoAbility<[Actions, Subjects]>;
export const appAbility = PureAbility as AbilityClass<AppAbility>;

export const ability = createMongoAbility<[Actions, Subjects]>();


export const setAbilitiesForUser = (user: UserDto, ability: AppAbility) => {
  const {can, rules} = new AbilityBuilder(appAbility);

  if (user.role === UserDtoRoleEnum.Admin) {
    can("read", "User");
    can("create", "User");
    can("update", "User");
    can("delete", "User");

    can("read", "Todo");
    can("create", "Todo");
    can("update", "Todo");
    can("delete", "Todo");
  }

  if (user.role === UserDtoRoleEnum.User) {
    can("read", "Todo");
    can("create", "Todo");
    can("update", "Todo");
    can("delete", "Todo");
  }

  ability.update(rules);
};
