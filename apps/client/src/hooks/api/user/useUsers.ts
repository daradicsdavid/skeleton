import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {useApi} from "../useApi";
import {Users200Response} from "@skeleton/api-client/api";

export default function useUsers(onSuccess: (data: Users200Response) => void, order: "ASC" | "DESC" = "ASC", page = 1, limit = 10) {
  const api = useApi();

  return useQuery<Users200Response, AxiosError>(
    ["users", page],
    () => api.userApi.users(order, page, limit).then(r => r.data),
    {onSuccess}
  );
}
