import {useToast} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

type SuccessToastProps = {
  title?: string,
  id?: string,
  description?: string,
  duration?: number,
}

export default function () {
  const {t} = useTranslation();
  const toast = useToast();
  return (props: SuccessToastProps) => toast({
    title: props.title ?? t("errors.general.description"),
    id: props.id,
    description: props.description ?? t("errors.general.description"),
    status: "error",
    duration: props.duration ?? 4000,
    isClosable: true
  });
}
