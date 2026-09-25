import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getProductById } from "../services/productsApi";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/currency";
import AppButton from "../components/AppButton";
import LoadingView from "../components/LoadingView";
import ErrorView from "../components/ErrorView";

export default function ProductDetailsScreen({ route, navigation }) {
  // productId gets passed in when we navigate here from HomeScreen
  const { productId } = route.params;
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadProduct() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProductById(productId);
      setProduct(data);
    } catch (err) {
      setError(err.message || "Unable to load product details");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadProduct();
  }, [productId]);

  if (isLoading) {
    return <LoadingView message="Loading product..." />;
  }

  if (error || !product) {
    return (
      <ErrorView message={error || "Product not found"} onRetry={loadProduct} />
    );
  }

  // brief asks for availability/stock info, so just check the stock count
  const inStock = product.stock > 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <Text style={styles.title}>{product.title}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
        <Text style={styles.rating}>⭐ {product.rating}</Text>
      </View>

      <View style={styles.badgeRow}>
        <Text style={styles.badge}>{product.category}</Text>
        <Text style={[styles.badge, inStock ? styles.inStock : styles.outOfStock]}>
          {inStock ? `In stock (${product.stock})` : "Out of stock"}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{product.description}</Text>

      <AppButton
        title="Add to Cart"
        onPress={() => addToCart(product)}
        style={styles.addButton}
      />
      <AppButton
        title="Back"
        variant="secondary"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginTop: 16,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2563eb",
  },
  rating: {
    fontSize: 14,
    color: "#475569",
  },
  badgeRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  badge: {
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#eef2ff",
    color: "#3730a3",
    textTransform: "capitalize",
    marginRight: 8,
  },
  inStock: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
  outOfStock: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0f172a",
    marginTop: 20,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#475569",
  },
  addButton: {
    marginTop: 24,
  },
  backButton: {
    marginTop: 10,
  },
});
