import {useMutation, useQueryClient} from "react-query";
import {AxiosError} from "axios";

import {LoginDto, UserDto} from "@skeleton/api-client/api";
import {useApi} from "../useApi";

export default function () {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<UserDto, AxiosError, LoginDto>(
    (r) => api.authApi.login(r).then((r) => r.data), {
      onSuccess: async (user) => {
        await queryClient.invalidateQueries();
        queryClient.setQueryData("me", user);
      }
    });
}
