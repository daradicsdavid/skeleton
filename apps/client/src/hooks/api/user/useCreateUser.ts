import {useApi} from "../useApi";
import {useMutation, useQueryClient} from "react-query";
import {AxiosError} from "axios";
import {CreateUserRequest, UserDto} from "@skeleton/api-client/api";

export default function () {
  const api = useApi();
  const queryClient = useQueryClient()

  return useMutation<UserDto, AxiosError, CreateUserRequest>(
    (r) => api.userApi.createUser(r).then((r) => r.data), {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["users"]});
      }
    });
}
