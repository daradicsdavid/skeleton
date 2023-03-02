import {test as base} from "@playwright/test";
import {LayoutFixture} from "../fixtures/common/layout.fixture";
import {Roles} from "@skeleton/common/constants/roles.enum";
import {getStoragePath} from "../utils/login";

export const testWithLayout = base.extend<{ layoutFixture: LayoutFixture }>({
  layoutFixture: async ({page}, use) => {
    await page.goto("/");
    const layoutFixture = new LayoutFixture(page);
    await use(layoutFixture);
  }
});

testWithLayout("User can log in as user role", async ({layoutFixture}) => {
  await layoutFixture.loginAs(Roles.user)
});

testWithLayout.describe(() => {
  testWithLayout.use({storageState: getStoragePath(Roles.user)});

  testWithLayout("User can log out as user role", async ({layoutFixture}) => {
    await layoutFixture.logout()
  });
});


testWithLayout("User can log in as admin role", async ({layoutFixture}) => {
  await layoutFixture.loginAs(Roles.admin)
});

testWithLayout.describe(() => {
  testWithLayout.use({storageState: getStoragePath(Roles.admin)});

  testWithLayout("User can log out as admin role", async ({layoutFixture}) => {
    await layoutFixture.logout()
  });
});
