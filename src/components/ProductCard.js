import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { formatCurrency } from "../utils/currency";

export default function ProductCard({ product, onPress, onAddToCart }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
          <Text style={styles.rating}>⭐ {product.rating?.toFixed?.(1) ?? "-"}</Text>
        </View>
        <Pressable
          style={styles.addButton}
          onPress={(event) => {
            event.stopPropagation();
            onAddToCart(product);
          }}
        >
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: 8,
    backgroundColor: "#f1f5f9",
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f172a",
  },
  description: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2563eb",
  },
  rating: {
    fontSize: 12,
    color: "#475569",
  },
  addButton: {
    marginTop: 8,
    alignSelf: "flex-start",
    backgroundColor: "#2563eb",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
});
