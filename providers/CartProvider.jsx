"use client";

import { LOCAL_STORAGE_CART } from "@/utils/constants";
import { createContext, useContext, useState, useEffect } from "react";

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

  useEffect(() => {
    try {
      setLoading(true);
      const localCart = localStorage.getItem(LOCAL_STORAGE_CART);
      if (localCart) {
        setCart(JSON.parse(localCart));
      }
    } catch (err) {
      console.error("Error loading cart:", err);
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = (recipe) => {
    const existingRecipe = cart.find((item) => item.idMeal === recipe.idMeal);
    if (existingRecipe) {
      return { success: false, message: "Recipe already in cart" };
    }

    const updatedCart = [...cart, recipe];
    setCart(updatedCart);
    localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(updatedCart));

    return { success: true, message: "Recipe added to cart" };
  };

  const removeFromCart = (idMeal) => {
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
