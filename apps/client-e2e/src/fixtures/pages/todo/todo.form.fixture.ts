import {expect, Locator, Page} from "@playwright/test";
import {LayoutFixture} from "../../common/layout.fixture";
import TodoDto from "@skeleton/entities/todo/todo.dto";

export class TodoFormFixture {
  readonly page: Page;
  readonly saveButton: Locator;
  readonly deleteButton: Locator;
  readonly layoutFixture: LayoutFixture
  readonly titleLabel: Locator

  constructor(page: Page) {
    this.layoutFixture = new LayoutFixture(page)
    this.page = page;
    this.deleteButton = page.getByRole("button", {name: "Delete"});
    this.saveButton = page.getByRole("button", {name: "Save"});
    this.titleLabel = page.locator("label:has-text(\"Title\")");
  }

  isEditForm() {
    return expect(this.deleteButton).toBeVisible();
  }

  isNotEditForm() {
    return expect(this.deleteButton).not.toBeVisible();
  }

  async fill(todo: Partial<TodoDto>) {
    await this.titleLabel.fill(todo.title);
  }

  async isFilledWith(todo: Partial<TodoDto>) {
    await expect(await this.titleLabel.inputValue()).toBe(todo.title);
  }
}


