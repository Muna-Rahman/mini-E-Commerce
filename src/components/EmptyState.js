import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function EmptyState({ title, message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 4,
    textAlign: "center",
  },
  message: {
    fontSize: 13,
    color: "#94a3b8",
    textAlign: "center",
  },
});
