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
import useUsers from "../../hooks/api/user/useUsers";
import {useTranslation} from "react-i18next";

export default function () {
  const navigate = useNavigate();
  const {t} = useTranslation("users");

  const [pageSize] = useState(10);
  const [total, setTotal] = useState<number | undefined>(
    undefined
  );
  const pagination = usePagination({
    total,
    initialState: {currentPage: 1, pageSize}
  });
  const users = useUsers((data) => {
    pagination.setCurrentPage(data.meta.page);
    setTotal(data.meta.itemCount);
  }, "ASC", pagination.currentPage);
  if (users.isLoading) {
    return <Progress size="md" isIndeterminate/>;
  }
  if (users.isError || !users.data) {
    return <div></div>;
  }


  return <Container maxW={"container.xl"} px={0} alignSelf={"center"}>
    <Can I={"create"} a={"User"}>
      <Button onClick={() => navigate("/users/create")}>{t("newUserButtonLabel")}</Button>
    </Can>
    <VStack w={"full"}>
      <TableContainer w={"full"}>
        <Table variant="simple">
          <TableCaption>{t("usersTable.caption")}</TableCaption>
          <Thead>
            <Tr>
              <Th>{t("usersTable.nameColumn")}</Th>
              <Th>{t("usersTable.roleColumn")}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              users.data.data.map(u => (
                <Tr key={u.id} onClick={() => navigate(`/users/${u.id}`)} cursor={"pointer"}
                    _hover={{bgColor: "primary.300"}}>
                  <Td>{u.name}</Td>
                  <Td>{u.role.toLowerCase()}</Td>
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
          <PaginationPrevious isDisabled={!users.data.meta.hasPreviousPage}
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
          <PaginationNext isDisabled={!users.data.meta.hasNextPage}
                          onClick={() => pagination.setCurrentPage(prev => prev + 1)}>{t("table.nextPageButtonLabel", {ns: "common"})}</PaginationNext>
        </PaginationContainer>
      </Pagination>
    </VStack>
  </Container>;
}
