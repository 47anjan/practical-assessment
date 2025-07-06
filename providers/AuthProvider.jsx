"use client";

import { createContext, useContext, useState, useEffect } from "react";

import getCurrentUser from "@/utils/user";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/constants";

const AuthContext = createContext(undefined);

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    try {
      setLoading(true);
      const getUser = async () => {
        const result = await getCurrentUser();
        if (!result._id) {
          setUser(null);
        } else {
          setUser(result);
        }
        setLoading(false);
      };

      getUser();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      setUser(result);
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Signup failed");
      }

      setUser(result);
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      await response.json();
      setUser(null);

      router.push("/login");
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  // Auth context value
  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
