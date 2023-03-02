import {Browser} from "playwright";
import {Roles} from "@skeleton/common/constants/roles.enum";
import {LayoutFixture} from "../fixtures/common/layout.fixture";

export function getStoragePath(role: Roles) {
  return `apps/client-e2e/src/storage-states/${role}`
}

export default async function (browser: Browser, baseURL: string, role: Roles) {
  const page = await browser.newPage()
  await page.goto(baseURL);
  const layout = new LayoutFixture(page)
  await layout.loginAs(role)
  return layout.page.context().storageState({path: getStoragePath(role)});
}
