import {useMutation, useQueryClient} from "react-query";
import {AxiosError} from "axios";
import {useApi} from "../useApi";
import {useNavigate} from "react-router-dom";

export default function () {
  const api = useApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  return useMutation<void, AxiosError, void>(
    () => api.authApi.logout().then((r) => r.data),
    {
      onSuccess: async () => {
        await queryClient.setQueryData("me", undefined)
        navigate("/")
      }
    }
  );
}
