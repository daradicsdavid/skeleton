import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import Todo from "./todo.entity";

@Injectable()
export default class TodoRepository extends EntityRepository<Todo> {
}
