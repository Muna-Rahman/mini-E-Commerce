import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import LoadingView from "../components/LoadingView";
import ErrorView from "../components/ErrorView";
import EmptyState from "../components/EmptyState";

export default function HomeScreen({ navigation }) {
  const { products, isLoading, isRefreshing, error, reload, refresh } =
    useProducts();
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // build the list of categories from whatever products came back,
  // "all" is always first so there's an option to clear the filter
  const categorySet = new Set(products.map((product) => product.category));
  const categories = ["all", ...Array.from(categorySet)];

  // same filter chain the assignment brief suggested - search by title,
  // then narrow down by category if one is picked
  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.trim().toLowerCase())
    )
    .filter((product) =>
      selectedCategory === "all" ? true : product.category === selectedCategory
    );

  if (isLoading) {
    return <LoadingView message="Loading products..." />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={reload} />;
  }

  if (products.length === 0) {
    return <EmptyState title="No products available" />;
  }

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} />

      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
        renderItem={({ item }) => {
          const active = item === selectedCategory;
          return (
            <Pressable
              onPress={() => setSelectedCategory(item)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {item}
              </Text>
            </Pressable>
          );
        }}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetails", { productId: item.id })
            }
            onAddToCart={addToCart}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
        }
        ListEmptyComponent={
          <EmptyState
            title="No products match your search"
            message="Try a different keyword or category."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  categoryRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  chipText: {
    fontSize: 12,
    color: "#334155",
    textTransform: "capitalize",
  },
  chipTextActive: {
    color: "#ffffff",
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: 24,
    flexGrow: 1,
  },
});
