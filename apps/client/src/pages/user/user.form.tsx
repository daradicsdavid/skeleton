import {Controller, useForm} from "react-hook-form";
import {
  Button,
  chakra,
  Container, FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Progress, Radio, RadioGroup, Stack,
  VStack
} from "@chakra-ui/react";
import {
  UserDto, UserDtoRoleEnum
} from "@skeleton/api-client/api";
import {useNavigate, useParams} from "react-router";
import useUser from "../../hooks/api/user/useUser";
import useCreateUser from "../../hooks/api/user/useCreateUser";
import useRemoveUser from "../../hooks/api/user/useRemoveUser";
import useUpdateUser from "../../hooks/api/user/useUpdateUser";
import {useTranslation} from "react-i18next";

export default function () {
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const removeUser = useRemoveUser();
  const navigate = useNavigate();
  const {t} = useTranslation("users");
  const {
    register,
    handleSubmit,
    control,
    formState: {errors, touchedFields},
    reset
  } = useForm<UserDto>({
      defaultValues: {
        name: "",
        role: UserDtoRoleEnum.User
      }
    }
  );

  const editableFields = ["name"]
  const {id} = useParams();
  const user = useUser(id, (user) => {
    reset(user);
  });

  const onSubmit = handleSubmit(async (form) => {
    if (!id) {
      try {
        const user = await createUser.mutateAsync(form);
        navigate(`/users/${user.id}`);
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        await updateUser.mutateAsync({id, user: form});
      } catch (e) {
        console.log(e)
      }
    }
  });


  return <Container maxW={"xl"} alignSelf={"center"}>
    {user.isLoading && <Progress w={"full"} variant={"primary"} isIndeterminate/>}
    <VStack
      w={"full"}
    >
      <chakra.form w={"full"} onSubmit={onSubmit}>
        <VStack spacing={6} alignItems={"start"}>
          <VStack spacing={5} w={"full"} alignItems={"start"}>
            <FormControl isInvalid={!!errors.name && touchedFields.name}>
              <FormLabel>{t("userForm.nameLabel")}</FormLabel>
              <Input  {...register("name", {required: true})}
                      color={"gray.600"}
                      textStyle={"text_md_regular"}
                      disabled={!editableFields.includes("name")}
              />
              {errors.name?.type === "required" &&
                <FormErrorMessage>{t("form.errorMessages.isRequired", {
                  ns: "common",
                  field: t("userForm.nameLabel")
                })}</FormErrorMessage>}
            </FormControl>
            <Controller
              name="role"
              control={control}
              render={({field: {onChange, value}}) => (<VStack>
                <FormControl>
                  <FormLabel>{t("userForm.roleLabel")}</FormLabel>
                  <RadioGroup isDisabled={user.data && !editableFields.includes("role")} onChange={onChange}
                              value={value}>
                    <Stack direction="row">
                      {Object.keys(UserDtoRoleEnum).map((key) => (
                        <Radio
                          data-testid={`${UserDtoRoleEnum[key as keyof typeof UserDtoRoleEnum]}`}
                          key={key}
                          value={UserDtoRoleEnum[key as keyof typeof UserDtoRoleEnum]}>{key}</Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </VStack>)}
            />
          </VStack>
          <HStack spacing={4} width={"full"}>
            {id && <Button isLoading={removeUser.isLoading}
                           width={"full"}
                           size={"lg"}
                           variant={"solid"}
                           colorScheme={"red"}
                           onClick={async () => {
                             await removeUser.mutateAsync(id)
                             navigate("/users")
                           }}>{t("form.deleteButtonLabel", {ns: "common"})}</Button>
            }
            <Button isLoading={createUser.isLoading || updateUser.isLoading} type="submit"
                    width={"full"}
                    size={"lg"}
                    variant={"primary"}>{t("form.saveButtonLabel", {ns: "common"})}</Button>
          </HStack>
        </VStack>
      </chakra.form>
    </VStack>
  </Container>;
}
