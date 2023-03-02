import {Injectable} from "@nestjs/common";
import TodoRepository from "./todo.repository";
import {InjectRepository} from "@mikro-orm/nestjs";
import Todo from "./todo.entity";
import {PageOptionsDto} from "@skeleton/common/pagination/page.options.dto";
import {PageDto} from "@skeleton/common/pagination/page.dto";
import TodoDto from "./todo.dto";
import {PageMetaDto} from "@skeleton/common/pagination/page.meta.dto";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import User from "@skeleton/entities/user/user.entity";

@Injectable()
export default class TodoService {
  constructor(@InjectRepository(Todo) readonly repository: TodoRepository, @InjectMapper() readonly mapper: Mapper) {
  }

  find(id: string) {
    return this.repository.findOne({id});
  }

  async update(todo: Todo, title: string) {
    todo.title = title;
    await this.repository.flush();
    return todo;
  }

  async create(title: string, user: User) {
    const newTodo = new Todo().assign({title, user})
    this.repository.persist(newTodo)
    await this.repository.flush();
    return newTodo;
  }


  public async getTodos(
    pageOptionsDto: PageOptionsDto,
    owner: User
  ): Promise<PageDto<TodoDto>> {
    const queryBuilder = this.repository.createQueryBuilder("todo");

    queryBuilder
      .where({user: {id: owner.id}})
      .orderBy({createdAt: pageOptionsDto.order})
      .offset(pageOptionsDto.offset)
      .limit(pageOptionsDto.limit);

    const itemCount = await queryBuilder.getCount();
    const todos = await queryBuilder.getResultList();

    const pageMetaDto = new PageMetaDto({itemCount, pageOptionsDto});

    return new PageDto(this.mapper.mapArray(todos, Todo, TodoDto), pageMetaDto);
  }

  removeTodo(todo: Todo) {
    return this.repository.removeAndFlush(todo);
  }
}
