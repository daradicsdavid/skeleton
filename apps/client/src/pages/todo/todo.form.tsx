import {useForm} from "react-hook-form";
import {
  Button,
  chakra,
  Container, FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Progress,
  VStack
} from "@chakra-ui/react";
import {
  TodoDto
} from "@skeleton/api-client/api";
import {useNavigate, useParams} from "react-router";
import useTodo from "../../hooks/api/todo/useTodo";
import useCreateTodo from "../../hooks/api/todo/useCreateTodo";
import useRemoveTodo from "../../hooks/api/todo/useRemoveTodo";
import useUpdateTodo from "../../hooks/api/todo/useUpdateTodo";
import {useTranslation} from "react-i18next";

export default function () {
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const removeTodo = useRemoveTodo();
  const navigate = useNavigate();
  const {t} = useTranslation("todos");

  const {
    register,
    handleSubmit,
    formState: {errors, touchedFields},
    reset
  } = useForm<TodoDto>({
      defaultValues: {
        title: ""
      }
    }
  );

  const {id} = useParams();
  const todo = useTodo(id, (todo) => {
    reset(todo);
  });

  const onSubmit = handleSubmit(async (form) => {
    if (!id) {
      try {
        const todo = await createTodo.mutateAsync(form);
        navigate(`/todos/${todo.id}`);
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        await updateTodo.mutateAsync({id, todo: form});
      } catch (e) {
        console.log(e)
      }
    }
  });


  return <Container maxW={"xl"} alignSelf={"center"}>
    {todo.isLoading && <Progress w={"full"} variant={"primary"} isIndeterminate/>}
    <VStack
      w={"full"}
    >
      <chakra.form w={"full"} onSubmit={onSubmit}>
        <VStack spacing={6} alignItems={"start"}>
          <VStack spacing={5} w={"full"} alignItems={"start"}>
            <FormControl isInvalid={!!errors.title && touchedFields.title}>
              <FormLabel>{t("todoForm.titleLabel")}</FormLabel>
              <Input {...register("title", {required: true})}
                     color={"gray.600"}
                     textStyle={"text_md_regular"}
              >
              </Input>
              {errors.title?.type === "required" &&
                <FormErrorMessage>{t("form.errorMessages.isRequired", {
                  ns: "common",
                  field: t("todoForm.titleLabel")
                })}</FormErrorMessage>}
            </FormControl>
          </VStack>
          <HStack spacing={4} width={"full"}>
            {id && <Button isLoading={removeTodo.isLoading}
                           width={"full"}
                           size={"lg"}
                           variant={"solid"}
                           colorScheme={"red"}
                           onClick={async () => {
                             await removeTodo.mutateAsync(id)
                             navigate("/todos")
                           }}>{t("form.deleteButtonLabel", {ns: "common"})}</Button>
            }
            <Button isLoading={createTodo.isLoading || updateTodo.isLoading} type="submit"
                    width={"full"}
                    size={"lg"}
                    variant={"primary"}>{t("form.saveButtonLabel", {ns: "common"})}</Button>
          </HStack>
        </VStack>
      </chakra.form>
    </VStack>
  </Container>;
}
