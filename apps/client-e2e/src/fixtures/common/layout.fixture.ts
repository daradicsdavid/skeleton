import {expect, Locator, Page} from "@playwright/test";
import {Roles} from "@skeleton/common/constants/roles.enum";

export class LayoutFixture {
  readonly page: Page;
  readonly loginAsUserButton: Locator;
  readonly loginAsAdminButton: Locator;
  readonly logoutButton: Locator;

  readonly usersMenuButton: Locator;
  readonly todosMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginAsUserButton = page.getByRole("button", {name: "Login as user"});
    this.loginAsAdminButton = page.getByRole("button", {name: "Login as admin"});
    this.logoutButton = page.getByRole("button", {name: "Logout"});
    this.usersMenuButton = page.getByRole("button", {name: "Users"});
    this.todosMenuButton = page.getByRole("button", {name: "Todos"});
  }

  isLoggedOut() {
    return expect(this.logoutButton).toBeDisabled();
  }

  isLoggedIn() {
    return expect(this.logoutButton).not.toBeDisabled();
  }

  async loginAs(role: Roles) {
    await this.isLoggedOut();
    switch (role) {
      case Roles.user:
        await this.loginAsUserButton.click()
        break;
      case Roles.admin:
        await this.loginAsAdminButton.click()
        break
    }
    await this.isLoggedIn()
  }

  async logout() {
    await this.isLoggedIn();
    await this.logoutButton.click();
    await this.isLoggedOut();
  }
}


