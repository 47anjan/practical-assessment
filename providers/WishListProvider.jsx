"use client";

import { BASE_URL, LOCAL_STORAGE_FAVORITE } from "@/utils/constants";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";

const WishListContext = createContext(undefined);

// Hook to use wishList context
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
  const { user } = useAuth();

  useEffect(() => {
    const loadWishList = async () => {
      try {
        setLoading(true);

        if (user) {
          const response = await fetch(`${BASE_URL}/api/user/wishlist`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          const data = await response.json();
          setWishList(data || []);
          if (response.ok) {
          } else {
            setWishList([]);
          }
        } else {
          const localWishList = localStorage.getItem(LOCAL_STORAGE_FAVORITE);
          if (localWishList) {
            setWishList(JSON.parse(localWishList));
          }
        }
      } catch (err) {
        console.error("Error loading wishList:", err);
        setError("Failed to load wishList");
      } finally {
        setLoading(false);
      }
    };

    loadWishList();
  }, [user]);

  const addToWishList = (recipe) => {
    const existingRecipe = wishList.find(
      (item) => item.idMeal === recipe.idMeal
    );
    if (existingRecipe) {
      return { success: false, message: "Recipe already in wishList" };
    }

    const postRecipe = async () => {
      try {
        if (user) {
          const response = await fetch(`${BASE_URL}/api/user/wishlist/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(recipe),
          });

          const data = await response.json();
          if (response.ok) {
            console.log("Recipe added to wishList:", data);
          } else {
            console.error("Failed to add recipe to wishList:", data);
            throw new Error(data.message || "Failed to add recipe to wishList");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    postRecipe();

    const updatedWishList = [...wishList, recipe];
    setWishList(updatedWishList);
    localStorage.setItem(
      LOCAL_STORAGE_FAVORITE,
      JSON.stringify(updatedWishList)
    );

    return { success: true, message: "Recipe added to wishList" };
  };

  const removeFromWishList = (idMeal) => {
    const deleteRecipe = async () => {
      try {
        if (user) {
          const response = await fetch(
            `${BASE_URL}/api/user/wishList/remove/${idMeal}`,
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
            console.log("Recipe removed from wishList:", data);
          } else {
            console.error("Failed to remove recipe from wishList");

            throw new Error(
              data.message || "Failed to remove recipe from wishList"
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    deleteRecipe();

    const updatedWishList = wishList.filter((item) => item.idMeal !== idMeal);
    setWishList(updatedWishList);
    localStorage.setItem(
      LOCAL_STORAGE_FAVORITE,
      JSON.stringify(updatedWishList)
    );
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
