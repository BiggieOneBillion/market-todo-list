import { QueryClient } from "@tanstack/react-query";
import api from "../api/ApiSettings";

const queryClient = new QueryClient();

export const fetchAllUserMarketLists = async () => {
  const state = JSON.parse(sessionStorage.getItem("user-details") as string);
  const token = state.state.token;

  // Check if the data is already in the cache
  const query = ["all-user-marketlist"];
  const productData = queryClient.getQueryData(query);

  if (productData) {
    // Return cached data
    return productData;
  } else {
    // Fetch data using queryClient.fetchQuery
    return queryClient.fetchQuery({
      queryKey: query,
      queryFn: async () => {
        const response = await api.get(`api/marketlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status !== 200) {
          throw new Response("Product not found", { status: 404 });
        }

        return response.data;
      },
    });
  }
};
