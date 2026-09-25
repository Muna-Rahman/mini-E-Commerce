import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import AppButton from "../components/AppButton";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <AppButton
        title="Log Out"
        variant="secondary"
        onPress={logout}
        style={styles.logoutButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#e2e8f0",
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  email: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
    marginBottom: 24,
  },
  logoutButton: {
    minWidth: 160,
  },
});
