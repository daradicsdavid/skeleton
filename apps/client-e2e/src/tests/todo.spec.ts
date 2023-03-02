import {expect, test} from "@playwright/test";
import {Roles} from "@skeleton/common/constants/roles.enum";
import {LayoutFixture} from "../fixtures/common/layout.fixture";
import {getStoragePath} from "../utils/login";
import {TodoListFixture} from "../fixtures/pages/todo/todo.list.fixture";
import {TodoFormFixture} from "../fixtures/pages/todo/todo.form.fixture";
import {
  existingTodo,
  existingTodoAfterEdit,
  existingTodoWillDelete,
  newTodo
} from "@skeleton/entities/todo/todo.test-constants";


test.describe(() => {
  test.use({storageState: getStoragePath(Roles.admin)});

  test("Todos menu is visible for logged in todo with admin role", async ({page}) => {
    await page.goto("/");
    const layoutFixture = new LayoutFixture(page)
    await expect(layoutFixture.todosMenuButton).toBeVisible()
  });
});

test.describe(() => {
  test.use({storageState: getStoragePath(Roles.user)});

  test.beforeEach(async ({page}) => {
    await page.goto("/");
  });

  test("Todos menu is visible for logged in user with user role", async ({page}) => {
    const layoutFixture = new LayoutFixture(page)
    await expect(layoutFixture.todosMenuButton).toBeVisible()
  });

  const testWithTodoPages = test.extend<{ todoList: TodoListFixture, todoForm: TodoFormFixture }>({
    todoList: async ({page}, use) => {
      const todoList = new TodoListFixture(page);
      await use(todoList);
    },
    todoForm: async ({page}, use) => {
      const todoForm = new TodoFormFixture(page);
      await use(todoForm);
    }
  });

  testWithTodoPages("Admin can create a new admin todo", async ({todoList, todoForm}) => {
    await todoList.layoutFixture.todosMenuButton.click()
    await todoList.newTodoButton.click()
    await todoForm.isNotEditForm()
    await todoForm.fill(newTodo)
    await todoForm.saveButton.click()
    await todoForm.isEditForm()
    await todoForm.isFilledWith(newTodo)
  });

  testWithTodoPages("Admin can edit existing todo", async ({todoList, todoForm}) => {
    await todoList.layoutFixture.todosMenuButton.click()
    const existingTodoRow = await todoList.getTodoRow(existingTodo)
    await expect(existingTodoRow).toBeVisible()
    await existingTodoRow.click()
    await todoForm.isEditForm()
    await todoForm.isFilledWith(existingTodo)
    await todoForm.fill(existingTodoAfterEdit)
    await todoForm.saveButton.click()
    await todoForm.isFilledWith(existingTodoAfterEdit)
  });

  testWithTodoPages("Admin can delete existing todo", async ({todoList, todoForm}) => {
    await todoList.layoutFixture.todosMenuButton.click()
    const existingTodoRow = await todoList.getTodoRow(existingTodoWillDelete)
    await expect(existingTodoRow).toBeVisible()
    await existingTodoRow.click()
    await todoForm.isEditForm()
    await todoForm.isFilledWith(existingTodoWillDelete)
    await todoForm.deleteButton.click()
    const existingTodoRowAfterDelete = await todoList.getTodoRow(existingTodoWillDelete)
    await expect(existingTodoRowAfterDelete).not.toBeVisible()
  });
});
