import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";

// Three navigators here:
// - Auth Stack: just the Login screen, shown when nobody is logged in
// - Home Stack: product list -> product details, nested inside the Home tab
// - Main Tabs: Home / Cart / Profile, shown once logged in

const AuthStackNav = createNativeStackNavigator();
const HomeStackNav = createNativeStackNavigator();
const TabsNav = createBottomTabNavigator();

function AuthStack() {
  return (
    <AuthStackNav.Navigator screenOptions={{ headerShown: false }}>
      <AuthStackNav.Screen name="Login" component={LoginScreen} />
    </AuthStackNav.Navigator>
  );
}

function HomeStack() {
  return (
    <HomeStackNav.Navigator>
      <HomeStackNav.Screen
        name="ProductList"
        component={HomeScreen}
        options={{ title: "Products" }}
      />
      <HomeStackNav.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: "Product Details" }}
      />
    </HomeStackNav.Navigator>
  );
}

// plain text tab icons - kept it simple instead of pulling in an icon
// library just for three tabs
function TabLabel({ text, focused }) {
  return (
    <Text style={{ fontSize: 11, color: focused ? "#2563eb" : "#94a3b8" }}>
      {text}
    </Text>
  );
}

function MainTabs() {
  const { itemCount } = useCart();

  return (
    <TabsNav.Navigator screenOptions={{ headerShown: false }}>
      <TabsNav.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => <TabLabel text="Home" focused={focused} />,
        }}
      />
      <TabsNav.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: true,
          title: itemCount > 0 ? `Cart (${itemCount})` : "Cart",
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
          tabBarIcon: ({ focused }) => <TabLabel text="Cart" focused={focused} />,
        }}
      />
      <TabsNav.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          title: "Profile",
          tabBarIcon: ({ focused }) => <TabLabel text="Profile" focused={focused} />,
        }}
      />
    </TabsNav.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated } = useAuth();

  // this is the actual switch the brief asks for: while not logged in,
  // only the auth stack is reachable, once logged in only the main tabs
  // are reachable. Logging out swaps this back automatically because
  // isAuthenticated changes.
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
