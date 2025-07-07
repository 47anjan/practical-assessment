import { Heart } from "lucide-react";
import { useWishList } from "@/providers/WishListProvider";
import { useState } from "react";

const ButtonWishList = ({ recipe }) => {
  const { addToWishList, removeFromWishList, isInWishList } = useWishList();

  const handleToggleWishList = () => {
    if (!recipe || !recipe.idMeal) {
      return;
    }

    let result;
    if (isInWishList(recipe.idMeal)) {
      removeFromWishList(recipe.idMeal);
    } else {
      addToWishList(recipe);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleToggleWishList}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        title={
          isInWishList(recipe.idMeal)
            ? "Remove from wishlist"
            : "Add to wishlist"
        }
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isInWishList(recipe.idMeal)
              ? "text-rose-500 fill-rose-500"
              : "text-gray-400 hover:text-rose-500"
          }`}
        />
      </button>
    </div>
  );
};

export default ButtonWishList;
