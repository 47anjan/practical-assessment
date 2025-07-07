"use client";

import { useCart } from "@/providers/CartProvider";

const ButtonAddToCart = ({ recipe }) => {
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = () => {
    if (!recipe || !recipe.idMeal) {
      return;
    }

    addToCart(recipe);
  };

  const recipeInCart = recipe?.idMeal ? isInCart(recipe.idMeal) : false;

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleAddToCart}
        disabled={recipeInCart}
        className={`text-white px-6 py-3 transition-colors ${
          recipeInCart
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-rose-500 hover:bg-rose-600"
        }`}
      >
        {recipeInCart ? "Already in Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ButtonAddToCart;
