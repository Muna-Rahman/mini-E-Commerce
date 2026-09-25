import React, { createContext, useContext, useState } from "react";

// a very simple authentication context that just keeps track of a single demo user and whether they're logged in or not. 
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

    // fake network delay to simulate a real login request
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
    // clear the user and any error state, so if they log back in after logging out, they don't see the old error message
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
