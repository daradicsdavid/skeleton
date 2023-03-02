import { useToast } from "@chakra-ui/react";

type InfoToastProps = {
  title: string,
  id?: string,
  description?: string,
  duration?: number,
}

export default function() {
  const toast = useToast();
  return (props: InfoToastProps) => toast({
    title: props.title,
    id: props.id,
    status: "info",
    duration: props.duration ?? 4000,
    isClosable: true
  });
}
