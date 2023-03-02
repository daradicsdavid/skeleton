import {
  Entity,
  EntityRepositoryType, Enum, Index, Property,
  Unique, OneToMany, Collection
} from "@mikro-orm/core";
import UserRepository from "./user.repository";
import {BaseEntity} from "../base/base.entity";
import {Roles} from "@skeleton/common/constants/roles.enum";
import Todo from "@skeleton/entities/todo/todo.entity";
import {AutoMap} from "@automapper/classes";
import {AuthorizableUser} from "nest-casl";

@Entity({customRepository: () => UserRepository})
export default class User extends BaseEntity<User> implements AuthorizableUser<Roles> {
  [EntityRepositoryType]?: UserRepository;

  @Property()
  @Unique()
  @Index()
  name!: string;

  @Enum({items: () => Roles})
  role!: Roles

  @OneToMany(() => Todo, (e) => e.user)
  @AutoMap(() => [Todo])
  todos = new Collection<Todo>(this);

  @Property({persist: false})
  get roles() {
    return [this.role];
  }
}
