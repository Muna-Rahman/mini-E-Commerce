import React, { createContext, useContext, useState } from "react";

// Simple auth context. Holds the logged in user and exposes login/logout.
// Since the assignment allows mock auth, we just check against one
// hardcoded demo account instead of calling a real backend.

const AuthContext = createContext(null);

const DEMO_EMAIL = "intern@example.com";
const DEMO_PASSWORD = "123456";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function login(email, password) {
    setError(null);
    setIsLoading(true);

    // fake a network call so the loading spinner actually has something
    // to show, like a real login request would
    await new Promise((resolve) => setTimeout(resolve, 800));

    const enteredEmail = email.trim().toLowerCase();

    if (enteredEmail === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setUser({
        name: "Demo Intern",
        email: DEMO_EMAIL,
        avatar: "https://i.pravatar.cc/150?img=12",
      });
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    setError("Invalid email or password.");
    return false;
  }

  function logout() {
    // clear the user completely, don't just navigate away, otherwise
    // the app would still think we're logged in
    setUser(null);
    setError(null);
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
