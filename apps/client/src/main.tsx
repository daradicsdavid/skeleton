import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AbilityContext} from "./ability/ability.context";
import {ability} from "./ability/ability";
import {QueryClientProvider} from "react-query";
import queryClient from "./react-query/query-client";
import ApiProvider from "./api/api.provider";
import Layout from "./components/layout.component";
import {ChakraProvider} from "@chakra-ui/react";
import theme from "./theme";
import UserList from "./pages/user/user.list";
import UserForm from "./pages/user/user.form";
import TodoList from "./pages/todo/todo.list";
import TodoForm from "./pages/todo/todo.form";
import "./i18n";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ApiProvider queryClient={queryClient}>
          <AbilityContext.Provider value={ability}>
            <ChakraProvider theme={theme} resetCSS>
              <Layout>
                <Routes>
                  <Route
                    path="/users"
                    element={<UserList/>}
                  >
                  </Route>
                  <Route path="users/:id" element={<UserForm/>}/>
                  <Route path="users/create" element={<UserForm/>}/>
                  <Route
                    path="/todos"
                    element={<TodoList/>}
                  >
                  </Route>
                  <Route path="todos/:id" element={<TodoForm/>}/>
                  <Route path="todos/create" element={<TodoForm/>}/>
                </Routes>
              </Layout>
            </ChakraProvider>
          </AbilityContext.Provider>
        </ApiProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
