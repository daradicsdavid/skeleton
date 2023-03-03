import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Query, UsePipes,
  ValidationPipe
} from "@nestjs/common";
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {Actions, CaslSubject, CaslUser, SubjectProxy, UserProxy} from "nest-casl";
import {Controller} from "../utils/custom-decorators/controller";
import TodoService from "@skeleton/entities/todo/todo.service";
import TodoDto from "@skeleton/entities/todo/todo.dto";
import {AuthorizedGuard} from "../auth/guards/authorized.guard";
import {ApiOkResponsePaginated} from "../utils/custom-decorators/api-ok-response-paginated";
import {PageOptionsDto} from "@skeleton/common/pagination/page.options.dto";
import {PageDto} from "@skeleton/common/pagination/page.dto";
import CreateTodoRequest from "./dto/create-todo.request";
import Todo from "@skeleton/entities/todo/todo.entity";
import UpdateTodoRequest from "./dto/update-todo.request";
import {UserParam} from "../auth/patameter-decorators/user.parameter-decorator";
import User from "@skeleton/entities/user/user.entity";
import {TodoHook} from "./todo.subject-hook";


@Controller("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService, @InjectMapper() readonly mapper: Mapper) {
  }

  @ApiOkResponse({type: TodoDto})
  @ApiOperation({operationId: "todo"})
  @AuthorizedGuard(Actions.read, Todo, TodoHook)
  @Get(":id")
  async get(@Param('id') id: string, @CaslSubject() subjectProxy: SubjectProxy<Todo>): Promise<TodoDto> {
    const todo = await subjectProxy.get()
    return this.mapper.map(todo, Todo, TodoDto);
  }

  @ApiOkResponsePaginated(TodoDto)
  @ApiOperation({operationId: "todos"})
  @Get("")
  @UsePipes(new ValidationPipe({transform: true}))
  @AuthorizedGuard(Actions.read, Todo)
  async list(@Query() pageOptionsDto: PageOptionsDto, @CaslUser() userProxy: UserProxy<User>): Promise<PageDto<TodoDto>> {
    const user = await userProxy.get()
    return this.todoService.getTodos(pageOptionsDto, user);
  }

  @ApiOkResponse({type: TodoDto})
  @ApiOperation({operationId: "createTodo"})
  @Post("")
  @AuthorizedGuard(Actions.create, Todo)
  async create(@Body() createTodoRequest: CreateTodoRequest, @UserParam() user: User): Promise<TodoDto> {
    const todo = await this.todoService.create(createTodoRequest.title, user);
    return this.mapper.map(todo, Todo, TodoDto);
  }

  @ApiOkResponse({type: TodoDto})
  @ApiOperation({operationId: "updateTodo"})
  @Post(":id")
  @AuthorizedGuard(Actions.create, Todo, TodoHook)
  async update(@Param('id') id: string, @Body() updateTodoRequest: UpdateTodoRequest, @CaslSubject() subjectProxy: SubjectProxy<Todo>): Promise<TodoDto> {
    const todo = await this.todoService.update(await subjectProxy.get(), updateTodoRequest.title);
    return this.mapper.map(todo, Todo, TodoDto);
  }


  @ApiOkResponse()
  @ApiOperation({operationId: "removeTodo"})
  @Delete(":id")
  @AuthorizedGuard(Actions.delete, Todo, TodoHook)
  async remove(@Param('id') id: string, @CaslSubject() subjectProxy: SubjectProxy<Todo>) {
    await this.todoService.removeTodo(await subjectProxy.get());
  }
}
