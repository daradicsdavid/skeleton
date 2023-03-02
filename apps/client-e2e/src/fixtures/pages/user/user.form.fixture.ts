import {expect, Locator, Page} from "@playwright/test";
import {LayoutFixture} from "../../common/layout.fixture";
import UserDto from "@skeleton/entities/user/user.dto";

export class UserFormFixture {
  readonly page: Page;
  readonly saveButton: Locator;
  readonly deleteButton: Locator;
  readonly layoutFixture: LayoutFixture
  readonly nameLabel: Locator

  constructor(page: Page) {
    this.layoutFixture = new LayoutFixture(page)
    this.page = page;
    this.deleteButton = page.getByRole("button", {name: "Delete"});
    this.saveButton = page.getByRole("button", {name: "Save"});
    this.nameLabel = page.locator("label:has-text(\"Name\")");
  }

  isEditForm() {
    return expect(this.deleteButton).toBeVisible();
  }

  isNotEditForm() {
    return expect(this.deleteButton).not.toBeVisible();
  }

  async fillNewUserForm(user: Partial<UserDto>) {
    await this.nameLabel.fill(user.name);
    await this.page.getByTestId(user.role).click();
  }

  async fillEditUserForm(user: Partial<UserDto>) {
    await this.nameLabel.fill(user.name);
  }

  async isFilledWith(user: Partial<UserDto>) {
    await expect(await this.nameLabel.inputValue()).toBe(user.name);
    const roleRadioButton = await this.page.getByTestId(user.role);
    await expect(roleRadioButton).toHaveAttribute("data-checked", "");
    await expect(roleRadioButton).toHaveAttribute("data-disabled", "");
  }
}


