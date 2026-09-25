import { useEffect, useState } from "react";
import { getProducts } from "../services/productsApi";

// Small hook so the Home screen doesn't have to deal with loading/error
// state by itself. Just fetches the product list once on mount, and
// exposes a way to reload (used for the Retry button and pull-to-refresh).

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
