import {Locator, Page} from "@playwright/test";
import {LayoutFixture} from "../../common/layout.fixture";
import UserDto from "@skeleton/entities/user/user.dto";

export class UserListFixture {
  readonly page: Page;
  readonly newUserButton: Locator;
  readonly layoutFixture: LayoutFixture

  constructor(page: Page) {
    this.layoutFixture = new LayoutFixture(page)
    this.page = page;
    this.newUserButton = page.getByRole("button", {name: "New user"});
  }

  async getUserRow(user: Partial<UserDto>) {
    return this.page.locator(`tr:has-text("${user.name}${user.role}")`);
  }
}


