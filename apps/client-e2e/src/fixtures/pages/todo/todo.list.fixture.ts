import {Locator, Page} from "@playwright/test";
import {LayoutFixture} from "../../common/layout.fixture";
import TodoDto from "@skeleton/entities/todo/todo.dto";

export class TodoListFixture {
  readonly page: Page;
  readonly newTodoButton: Locator;
  readonly layoutFixture: LayoutFixture

  constructor(page: Page) {
    this.layoutFixture = new LayoutFixture(page)
    this.page = page;
    this.newTodoButton = page.getByRole("button", {name: "New todo"});
  }

  async getTodoRow(todo: Partial<TodoDto>) {
    return this.page.locator("tr", {hasText: new RegExp(`^${todo.title}$`)});
  }
}


