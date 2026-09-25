import React from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/currency";
import AppButton from "../components/AppButton";
import EmptyState from "../components/EmptyState";

// A single row in the cart list, showing the product thumbnail, title, price, quantity controls, and a remove button. The quantity controls call the onIncrease and onDecrease callbacks passed in as props, and the remove button calls onRemove.
function CartRow({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <View style={styles.row}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.rowInfo}>
        <Text style={styles.rowTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.rowPrice}>{formatCurrency(item.price)}</Text>

        <View style={styles.quantityRow}>
          <Pressable style={styles.qtyButton} onPress={() => onDecrease(item.id)}>
            <Text style={styles.qtyButtonText}>-</Text>
          </Pressable>
          <Text style={styles.qtyValue}>{item.quantity}</Text>
          <Pressable style={styles.qtyButton} onPress={() => onIncrease(item.id)}>
            <Text style={styles.qtyButtonText}>+</Text>
          </Pressable>

          <Pressable style={styles.removeButton} onPress={() => onRemove(item.id)}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function CartScreen() {
  const { items, increase, decrease, removeItem, itemCount, subtotal } =
    useCart();

  function handleCheckout() {
    // checkout not implemented as mentioned in the assignment instructions.
    Alert.alert("Checkout", "Checkout functionality is not implemented.");
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Browse products and add something you like."
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CartRow
            item={item}
            onIncrease={increase}
            onDecrease={decrease}
            onRemove={removeItem}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Items</Text>
          <Text style={styles.summaryValue}>{itemCount}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.subtotalValue}>{formatCurrency(subtotal)}</Text>
        </View>
        <AppButton title="Checkout" onPress={handleCheckout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  listContent: {
    padding: 16,
    paddingBottom: 8,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: "#f1f5f9",
  },
  rowInfo: {
    flex: 1,
    marginLeft: 12,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a",
  },
  rowPrice: {
    fontSize: 13,
    color: "#2563eb",
    marginTop: 2,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#eef2ff",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563eb",
  },
  qtyValue: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a",
    minWidth: 18,
    textAlign: "center",
  },
  removeButton: {
    marginLeft: "auto",
  },
  removeButtonText: {
    fontSize: 12,
    color: "#dc2626",
    fontWeight: "600",
  },
  summary: {
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    backgroundColor: "#fff",
    padding: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 13,
    color: "#64748b",
  },
  summaryValue: {
    fontSize: 13,
    color: "#0f172a",
    fontWeight: "600",
  },
  subtotalValue: {
    fontSize: 16,
    color: "#0f172a",
    fontWeight: "700",
  },
});
