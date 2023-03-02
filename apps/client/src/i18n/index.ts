import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import common from "../assets/locales/en/common.json";
import header from "../assets/locales/en/header.json";
import users from "../assets/locales/en/users.json";
import todos from "../assets/locales/en/todos.json";

import commonHu from "../assets/locales/hu/common.json";
import headerHu from "../assets/locales/hu/header.json";
import usersHu from "../assets/locales/hu/users.json";
import todosHu from "../assets/locales/hu/todos.json";


export const defaultNS = "common";

export const resources = {
  en: {
    common: common,
    header: header,
    users: users,
    todos: todos
  },
  hu: {
    common: commonHu,
    header: headerHu,
    users: usersHu,
    todos: todosHu
  }
} as const;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    defaultNS: defaultNS,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
