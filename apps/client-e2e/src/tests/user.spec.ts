import {expect, test} from "@playwright/test";
import {Roles} from "@skeleton/common/constants/roles.enum";
import {LayoutFixture} from "../fixtures/common/layout.fixture";
import {getStoragePath} from "../utils/login";
import {UserListFixture} from "../fixtures/pages/user/user.list.fixture";
import {UserFormFixture} from "../fixtures/pages/user/user.form.fixture";
import {
  existingUser,
  existingUserAfterEdit,
  existingUserWillDelete,
  newUser
} from "@skeleton/entities/user/user.test-constants";


test.describe(() => {
  test.use({storageState: getStoragePath(Roles.user)});

  test("Users menu is not visible for logged in user with user role", async ({page}) => {
    await page.goto("/");
    const layoutFixture = new LayoutFixture(page)
    await expect(layoutFixture.usersMenuButton).not.toBeVisible()
  });
});

test.describe(() => {
  test.use({storageState: getStoragePath(Roles.admin)});

  test.beforeEach(async ({page}) => {
    await page.goto("/");
  });

  test("Users menu is visible for logged in user with admin role", async ({page}) => {
    const layoutFixture = new LayoutFixture(page)
    await expect(layoutFixture.usersMenuButton).toBeVisible()
  });

  const testWithUserPages = test.extend<{ userList: UserListFixture, userForm: UserFormFixture }>({
    userList: async ({page}, use) => {
      const userList = new UserListFixture(page);
      await use(userList);
    },
    userForm: async ({page}, use) => {
      const userForm = new UserFormFixture(page);
      await use(userForm);
    }
  });

  testWithUserPages("Admin can create a new admin user", async ({userList, userForm}) => {
    await userList.layoutFixture.usersMenuButton.click()
    await userList.newUserButton.click()
    await userForm.isNotEditForm()
    await userForm.fillNewUserForm(newUser)
    await userForm.saveButton.click()
    await userForm.isEditForm()
    await userForm.isFilledWith(newUser)
  });

  testWithUserPages("Admin can edit existing user", async ({userList, userForm}) => {
    await userList.layoutFixture.usersMenuButton.click()
    const existingUserRow = await userList.getUserRow(existingUser)
    await expect(existingUserRow).toBeVisible()
    await existingUserRow.click()
    await userForm.isEditForm()
    await userForm.isFilledWith(existingUser)
    await userForm.fillEditUserForm(existingUserAfterEdit)
    await userForm.saveButton.click()
    await userForm.isFilledWith(existingUserAfterEdit)
  });

  testWithUserPages("Admin can delete existing user", async ({userList, userForm}) => {
    await userList.layoutFixture.usersMenuButton.click()
    const existingUserRow = await userList.getUserRow(existingUserWillDelete)
    await expect(existingUserRow).toBeVisible()
    await existingUserRow.click()
    await userForm.isEditForm()
    await userForm.isFilledWith(existingUserWillDelete)
    await userForm.deleteButton.click()
    const existingUserRowAfterDelete = await userList.getUserRow(existingUserWillDelete)
    await expect(existingUserRowAfterDelete).not.toBeVisible()
  });
});
