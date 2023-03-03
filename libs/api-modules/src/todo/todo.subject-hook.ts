import {BadRequestException, Injectable} from '@nestjs/common';
import {Request, SubjectBeforeFilterHook} from 'nest-casl';
import Todo from "@skeleton/entities/todo/todo.entity";
import TodoService from "@skeleton/entities/todo/todo.service";

@Injectable()
export class TodoHook implements SubjectBeforeFilterHook<Todo, Request> {
  constructor(readonly todoService: TodoService) {
  }

  async run({params}: Request) {
    const todo = this.todoService.find(params.id);
    if (!todo) {
      throw new BadRequestException();
    }
    return todo
  }
}
