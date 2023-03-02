import {
  Button,
  Container,
  Progress,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr, VStack
} from "@chakra-ui/react";
import {
  Pagination,
  PaginationContainer, PaginationNext, PaginationPage,
  PaginationPageGroup,
  PaginationPrevious, PaginationSeparator,
  usePagination
} from "@ajna/pagination";
import {useState} from "react";
import {useNavigate} from "react-router";
import Can from "../../ability/can";
import useTodos from "../../hooks/api/todo/useTodos";
import {useTranslation} from "react-i18next";

export default function () {
  const navigate = useNavigate();
  const {t} = useTranslation("todos");

  const [pageSize] = useState(10);
  const [total, setTotal] = useState<number | undefined>(
    undefined
  );
  const pagination = usePagination({
    total,
    initialState: {currentPage: 1, pageSize}
  });
  const todos = useTodos((data) => {
    pagination.setCurrentPage(data.meta.page);
    setTotal(data.meta.itemCount);
  }, "ASC", pagination.currentPage);
  if (todos.isLoading) {
    return <Progress size="md" isIndeterminate/>;
  }
  if (todos.isError || !todos.data) {
    return <div></div>;
  }


  return <Container maxW={"container.xl"} px={0} alignSelf={"center"}>
    <Can I={"create"} a={"Todo"}>
      <Button onClick={() => navigate("/todos/create")}>{t("newTodoButtonLabel")}</Button>
    </Can>
    <VStack w={"full"}>
      <TableContainer w={"full"}>
        <Table variant="simple">
          <TableCaption>{t("todosTable.caption")}</TableCaption>
          <Thead>
            <Tr>
              <Th>{t("todosTable.titleColumn")}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              todos.data.data.map(u => (
                <Tr key={u.id} onClick={() => navigate(`/todos/${u.id}`)} cursor={"pointer"}
                    _hover={{bgColor: "primary.300"}}>
                  <Td>{u.title}</Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        pagesCount={pagination.pagesCount}
        currentPage={pagination.currentPage}
        onPageChange={pagination.setCurrentPage}
      >
        <PaginationContainer
          align="center"
          justify="space-between"
          p={4}
          w="full"
        >
          <PaginationPrevious isDisabled={!todos.data.meta.hasPreviousPage}
                              onClick={() => pagination.setCurrentPage(prev => prev - 1)}>{t("table.previousPageButtonLabel", {ns: "common"})}</PaginationPrevious>
          <PaginationPageGroup
            isInline
            align="center"
            separator={
              <PaginationSeparator
                isDisabled
                bg="blue.300"
                fontSize="sm"
                w={8}
                jumpSize={11}
              />
            }>
            {pagination.pages.map((page: number) => (
              <PaginationPage
                w={7}
                bg="gray.300"
                key={`pagination_page_${page}`}
                page={page}
                onClick={() => console.warn("Im clicking the page")}
                fontSize="sm"
                _hover={{
                  bg: "green.300"
                }}
                _current={{
                  bg: "primary.600",
                  fontSize: "sm",
                  w: 7
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext isDisabled={!todos.data.meta.hasNextPage}
                          onClick={() => pagination.setCurrentPage(prev => prev + 1)}>{t("table.nextPageButtonLabel", {ns: "common"})}</PaginationNext>
        </PaginationContainer>
      </Pagination>
    </VStack>
  </Container>;
}
