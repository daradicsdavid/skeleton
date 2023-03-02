import {Entity, EntityRepositoryType, IdentifiedReference, ManyToOne, Property} from "@mikro-orm/core";
import TodoRepository from "./todo.repository";
import {BaseEntity} from "../base/base.entity";
import {AutoMap} from "@automapper/classes";
import User from "@skeleton/entities/user/user.entity";

@Entity({customRepository: () => TodoRepository})
export default class Todo extends BaseEntity<Todo> {
  [EntityRepositoryType]?: TodoRepository;

  @Property()
  title!: string;

  /**
   * @autoMapIgnore
   */
  @ManyToOne(() => User, {wrappedReference: true, onDelete: "cascade"})
  @AutoMap(() => User)
  user!: IdentifiedReference<User>;


}
