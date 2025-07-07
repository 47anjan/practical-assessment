"use client";

import { BASE_URL, LOCAL_STORAGE_CART } from "@/utils/constants";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";

const CartContext = createContext(undefined);

// Hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);

        if (user) {
          const response = await fetch(`${BASE_URL}/api/user/cart`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          const data = await response.json();
          setCart(data || []);
          if (response.ok) {
          } else {
            setCart([]);
          }
        } else {
          const localCart = localStorage.getItem(LOCAL_STORAGE_CART);
          if (localCart) {
            setCart(JSON.parse(localCart));
          }
        }
      } catch (err) {
        console.error("Error loading cart:", err);
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  const addToCart = (recipe) => {
    const existingRecipe = cart.find((item) => item.idMeal === recipe.idMeal);
    if (existingRecipe) {
      return { success: false, message: "Recipe already in cart" };
    }

    const postRecipe = async () => {
      try {
        if (user) {
          const response = await fetch(`${BASE_URL}/api/user/cart/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(recipe),
          });

          const data = await response.json();
          if (response.ok) {
            console.log("Recipe added to cart:", data);
          } else {
            console.error("Failed to add recipe to cart:", data);
            throw new Error(data.message || "Failed to add recipe to cart");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    postRecipe();

    const updatedCart = [...cart, recipe];
    setCart(updatedCart);
    localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(updatedCart));

    return { success: true, message: "Recipe added to cart" };
  };

  const removeFromCart = (idMeal) => {
    const deleteRecipe = async () => {
      try {
        if (user) {
          const response = await fetch(
            `${BASE_URL}/api/user/cart/remove/${idMeal}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          const data = await response.json();
          if (response.ok) {
            console.log("Recipe removed from cart:", data);
          } else {
            console.error("Failed to remove recipe from cart");

            throw new Error(
              data.message || "Failed to remove recipe from cart"
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    deleteRecipe();

    const updatedCart = cart.filter((item) => item.idMeal !== idMeal);
    setCart(updatedCart);
    localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(updatedCart));
    return { success: true, message: "Recipe removed from cart" };
  };

  const getCartItemCount = () => cart.length;

  const isInCart = (idMeal) => cart.some((item) => item.idMeal === idMeal);

  const value = {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    getCartItemCount,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
