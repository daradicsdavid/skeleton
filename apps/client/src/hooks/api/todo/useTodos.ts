import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {useApi} from "../useApi";
import {Todos200Response} from "@skeleton/api-client/api";

export default function useTodos(onSuccess: (data: Todos200Response) => void, order: "ASC" | "DESC" = "ASC", page = 1, limit = 10) {
  const api = useApi();

  return useQuery<Todos200Response, AxiosError>(
    ["todos", page],
    () => api.todoApi.todos(order, page, limit).then(r => r.data),
    {onSuccess}
  );
}
