import {createContext} from "react";
import {AxiosInstance} from "axios";
import {
  UserApi,
  AuthApi,
  TodoApi
} from "@skeleton/api-client/api";

export interface ApiContextType {
  axios: AxiosInstance;
  userApi: UserApi;
  authApi: AuthApi;
  todoApi: TodoApi;
}

export const ApiContext = createContext<ApiContextType>({} as any);
