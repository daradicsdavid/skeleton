import {useQuery, useQueryClient} from "react-query";
import {AxiosError} from "axios";
import {useContext} from "react";
import {useApi} from "../useApi";
import {AbilityContext} from "../../../ability/ability.context";
import {UserDto} from "@skeleton/api-client/api";
import {setAbilitiesForUser} from "../../../ability/ability";
import {useNavigate} from "react-router";


export function useMe(onSuccess?: (user: UserDto) => void, onError?: (e: AxiosError) => void) {
  const api = useApi();
  const ability = useContext(AbilityContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  return useQuery<UserDto, AxiosError>(
    "me",
    () => api.authApi.me().then(r => r.data),
    {
      retry: false,
      onSuccess: (me) => {
        if (!me) {
          return;
        }
        setAbilitiesForUser(me, ability);
        if (onSuccess)
          onSuccess(me);
      }, onError: (e) => {
        ability.update([]);
        queryClient.setQueryData("me", undefined);
        navigate("/")
        if (onError) {
          onError(e);
        }
      }
    }
  );
}
