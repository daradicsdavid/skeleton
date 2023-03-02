import {useApi} from "../useApi";
import {useMutation, useQueryClient} from "react-query";
import {AxiosError} from "axios";
import {UpdateTodoRequest, TodoDto} from "@skeleton/api-client/api";

export default function () {
  const api = useApi();
  const queryClient = useQueryClient()

  return useMutation<TodoDto, AxiosError, { id: string, todo: UpdateTodoRequest }>(
    (r) => api.todoApi.updateTodo(r.id, r.todo).then((r) => r.data), {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["todos"]});
      }
    });
}
