import React, {useMemo} from "react";
import axios from "axios";
import {QueryClient} from "react-query";
import {ApiContext} from "./api.context";
import {
  UserApi, AuthApi, TodoApi
} from "@skeleton/api-client/api";
import {environment} from "../environments/environment";
import {useNavigate} from "react-router-dom";

interface AxiosProviderProps {
  queryClient: QueryClient;
}

export default function ApiProvider(
  props: React.PropsWithChildren<AxiosProviderProps>
) {
  const navigate = useNavigate()
  const api = useMemo(() => {

    const axiosClient = axios.create({
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    });

    axiosClient.interceptors.response.use(
      function (response) {
        handleDates(response.data);
        return response;
      },
      (error) => {
        // eslint-disable-next-line no-constant-condition
        if (
          axios.isAxiosError(error) &&
          !error.request.responseURL.endsWith("login") &&
          !error.request.responseURL.endsWith("me") &&
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/")
        }
        return Promise.reject(error);
      }
    );
    return {
      axios: axiosClient,
      userApi: new UserApi(undefined, environment.api_url, axiosClient),
      todoApi: new TodoApi(undefined, environment.api_url, axiosClient),
      authApi: new AuthApi(undefined, environment.api_url, axiosClient),
    };
  }, []);

  return (
    <ApiContext.Provider value={api}> {props.children} </ApiContext.Provider>
  );
}

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

function isIsoDateString(value: any): boolean {
  return value && typeof value === "string" && isoDateFormat.test(value);
}

function handleDates(body: any) {
  if (body === null || body === undefined || typeof body !== "object")
    return body;

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) body[key] = new Date(value);
    else if (typeof value === "object") handleDates(value);
  }
}
