import { useToast } from "@chakra-ui/react";

type SuccessToastProps = {
  title: string,
  description?: string,
  id?: string,
  duration?: number,
}

export default function() {
  const toast = useToast();
  return (props: SuccessToastProps) => toast({
    title: props.title,
    id: props.id,
    description: props.description,
    status: "success",
    duration: props.duration ?? 4000,
    isClosable: true
  });
}
