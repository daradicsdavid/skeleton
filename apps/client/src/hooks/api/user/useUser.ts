import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {useApi} from "../useApi";
import {UserDto} from "@skeleton/api-client/api";

export default function useUser(id: string | undefined, onSuccess: (user: UserDto) => void = () => ({})) {
  const api = useApi();

  return useQuery<UserDto, AxiosError>(
    ["users", id],
    () => api.userApi.user(id!).then(r => r.data),
    {onSuccess, enabled: !!id}
  );
}
