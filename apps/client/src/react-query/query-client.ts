import { QueryClient } from "react-query";
import { environment } from "../environments/environment";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: environment.production,
      retry: 1
    }
  }
});

export default queryClient;
