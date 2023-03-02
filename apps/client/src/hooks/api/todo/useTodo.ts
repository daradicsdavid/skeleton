import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {useApi} from "../useApi";
import {TodoDto} from "@skeleton/api-client/api";

export default function useTodo(id: string | undefined, onSuccess: (todo: TodoDto) => void = () => ({})) {
  const api = useApi();

  return useQuery<TodoDto, AxiosError>(
    ["todos", id],
    () => api.todoApi.todo(id!).then(r => r.data),
    {onSuccess, enabled: !!id}
  );
}
