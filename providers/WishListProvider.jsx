"use client";

import { LOCAL_STORAGE_FAVORITE } from "@/utils/constants";
import { createContext, useContext, useState, useEffect } from "react";

const WishListContext = createContext(undefined);

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (context === undefined) {
    throw new Error("useWishList must be used within a WishListProvider");
  }
  return context;
};

export const WishListProvider = ({ children }) => {
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      const localWishList = localStorage.getItem(LOCAL_STORAGE_FAVORITE);
      if (localWishList) {
        setWishList(JSON.parse(localWishList));
      }
    } catch (err) {
      console.error("Error loading wishList:", err);
      setError("Failed to load wishList");
    } finally {
      setLoading(false);
    }
  }, []);

  const addToWishList = (recipe) => {
    const existingRecipe = wishList.find(
      (item) => item.idMeal === recipe.idMeal
    );
    if (existingRecipe) {
      return { success: false, message: "Recipe already in wishList" };
    }

    const updatedWishList = [...wishList, recipe];
    localStorage.setItem(
      LOCAL_STORAGE_FAVORITE,
      JSON.stringify(updatedWishList)
    );
    setWishList(updatedWishList);
    return { success: true, message: "Recipe added to wishList" };
  };

  const removeFromWishList = (idMeal) => {
    const updatedWishList = wishList.filter((item) => item.idMeal !== idMeal);
    localStorage.setItem(
      LOCAL_STORAGE_FAVORITE,
      JSON.stringify(updatedWishList)
    );
    setWishList(updatedWishList);
    return { success: true, message: "Recipe removed from wishList" };
  };

  const getWishListItemCount = () => wishList.length;

  const isInWishList = (idMeal) =>
    wishList.some((item) => item.idMeal === idMeal);

  const value = {
    wishList,
    loading,
    error,
    addToWishList,
    removeFromWishList,
    getWishListItemCount,
    isInWishList,
  };

  return (
    <WishListContext.Provider value={value}>
      {children}
    </WishListContext.Provider>
  );
};

export default WishListProvider;
