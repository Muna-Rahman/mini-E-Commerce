import { useEffect, useState } from "react";
import { getProducts } from "../services/productsApi";

// A custom hook that fetches the list of products from the API and exposes loading, refreshing, and error state. It also provides functions to reload or refresh the products.

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  async function load(isRefresh) {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }

    setIsLoading(false);
    setIsRefreshing(false);
  }

  useEffect(() => {
    load(false);
  }, []);

  return {
    products,
    isLoading,
    isRefreshing,
    error,
    reload: () => load(false),
    refresh: () => load(true),
  };
}
