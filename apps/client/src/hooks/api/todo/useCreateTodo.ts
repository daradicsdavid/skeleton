import {useApi} from "../useApi";
import {useMutation, useQueryClient} from "react-query";
import {AxiosError} from "axios";
import {CreateTodoRequest, TodoDto} from "@skeleton/api-client/api";

export default function () {
  const api = useApi();
  const queryClient = useQueryClient()

  return useMutation<TodoDto, AxiosError, CreateTodoRequest>(
    (r) => api.todoApi.createTodo(r).then((r) => r.data), {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["todos"]});
      }
    });
}
