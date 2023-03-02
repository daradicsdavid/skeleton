import {chromium, FullConfig} from "@playwright/test";
import login from "./utils/login";
import {Roles} from "@skeleton/common/constants/roles.enum";


async function globalSetup(config: FullConfig) {
  const baseUrl = config.projects[0].use.baseURL;
  const browser = await chromium.launch();
  await login(browser, baseUrl, Roles.admin);
  await login(browser, baseUrl, Roles.user);
  await browser.close();
}


export default globalSetup;
