import TodoDto from "@skeleton/entities/todo/todo.dto";

export const newTodo: Partial<TodoDto> = {
  title: "newTodo",
}

export const existingTodo: Partial<TodoDto> = {
  title: "existingTodo",
}

export const existingTodoAfterEdit: Partial<TodoDto> = {
  ...existingTodo,
  title: "existingTodoAfterUpdate"
}

export const existingTodoWillDelete: Partial<TodoDto> = {
  title: "existingTodoWillDelete",
}
