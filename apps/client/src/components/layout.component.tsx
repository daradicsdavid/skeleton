import {ReactNode} from "react";
import {Button, Container, Divider, Flex} from "@chakra-ui/react";
import useLogin from "../hooks/api/auth/useLogin";
import {useMe} from "../hooks/api/auth/useMe";
import useLogout from "../hooks/api/auth/useLogout";
import {useNavigate} from "react-router-dom";
import Can from "../ability/can";
import {useTranslation} from "react-i18next";

export default function (props: { children?: ReactNode }) {
  const login = useLogin()
  const logout = useLogout()
  const me = useMe()
  const navigate = useNavigate();
  const {t} = useTranslation("header");
  return <Flex flexDirection={"column"} alignItems={"center"}>
    <Container m={2} w={"container.xl"} maxW={"container.xl"} px={0}>
      <Flex w={"full"} justifyContent={"end"} gap={2}>
        <Button isLoading={login.isLoading} onClick={() => login.mutate({name: "user"})}>{t("loginAsUser")}</Button>
        <Button isLoading={login.isLoading} onClick={() => login.mutate({name: "admin"})}>{t("loginAsAdmin")}</Button>
        <Button isDisabled={!me.data} isLoading={logout.isLoading}
                onClick={() => logout.mutate()}>{t("logout")}</Button>
      </Flex>
    </Container>
    <Divider></Divider>
    <Container w={"container.xl"} maxW={"container.xl"} pt={4}>
      <Flex flexDirection={"column"} gap={4}>
        {me.data &&
          <Flex gap={2}>
            <Can I={"read"} a={"User"}>
              <Button onClick={() => navigate("/users")} variant={"link"}>{t("users")}</Button>
            </Can>
            <Can I={"read"} a={"Todo"}>
              <Button onClick={() => navigate("/todos")} variant={"link"}>{t("todos")}</Button>
            </Can>
          </Flex>
        }
        {props.children}
      </Flex>
    </Container>
  </Flex>
}
