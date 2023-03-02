import {useApi} from "../useApi";
import {useMutation, useQueryClient} from "react-query";
import {AxiosError} from "axios";
import {UpdateUserRequest, UserDto} from "@skeleton/api-client/api";

export default function () {
  const api = useApi();
  const queryClient = useQueryClient()

  return useMutation<UserDto, AxiosError, { id: string, user: UpdateUserRequest }>(
    (r) => api.userApi.updateUser(r.id, r.user).then((r) => r.data), {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["users"]});
      }
    });
}
