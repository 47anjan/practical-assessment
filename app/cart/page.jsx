"use client";

import Error from "@/components/Common/Error";
import Loading from "@/components/Common/Loading";
import { useCart } from "@/providers/CartProvider";
import RecipeItem from "@/components/Recipes/RecipeItem";

const Cart = () => {
  const { cart, removeFromCart, getCartItemCount, loading, error } = useCart();

  if (loading) {
    return (
      <Loading>
        <div className="text-xl">Loading cart...</div>
      </Loading>
    );
  }

  if (error) {
    return <Error message={`Error: ${error}`} />;
  }

  const handleRemoveFromCart = (idMeal) => {
    removeFromCart(idMeal);
  };

  return (
    <div className="bg-gray-50 pt-20 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Your Recipe Cart
          </h1>
          <p className="text-gray-600">
            {getCartItemCount() === 0
              ? "Your cart is empty"
              : `${getCartItemCount()} recipe${
                  getCartItemCount() > 1 ? "s" : ""
                } in your cart`}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Add some delicious recipes to get started!
            </p>
            <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-lg transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid gap-3">
            {cart.map((recipe) => (
              <RecipeItem
                key={recipe.idMeal}
                recipe={recipe}
                handleRemove={() => handleRemoveFromCart(recipe.idMeal)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
