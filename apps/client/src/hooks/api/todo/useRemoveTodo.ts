import { useApi } from "../useApi";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";

export default function() {
  const api = useApi();
  const queryClient = useQueryClient()

  return useMutation<void, AxiosError, string>(
    (id) => api.todoApi.removeTodo(id).then((r) => r.data), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    });
}
