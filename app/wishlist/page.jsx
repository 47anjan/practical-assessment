"use client";

import Error from "@/components/Common/Error";
import Loading from "@/components/Common/Loading";
import { useWishList } from "@/providers/WishListProvider";

const WishList = () => {
  const { wishList, removeFromWishList, getWishListItemCount, loading, error } =
    useWishList();

  if (loading) {
    return (
      <Loading>
        <div className="text-xl">Loading WishList...</div>
      </Loading>
    );
  }

  if (error) {
    return <Error message={`Error: ${error}`} />;
  }

  const handleRemoveFromWishList = (idMeal) => {
    removeFromWishList(idMeal);
  };

  return (
    <div className="bg-gray-50 pt-20 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Your Recipe WishList
          </h1>
          <p className="text-gray-600">
            {getWishListItemCount() === 0
              ? "Your wishList is empty"
              : `${getWishListItemCount()} recipe${
                  getWishListItemCount() > 1 ? "s" : ""
                } in your wishList`}
          </p>
        </div>

        {wishList.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              Your wishList is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Add some delicious recipes to get started!
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid gap-3">
            {wishList.map((recipe) => (
              <div
                key={recipe.idMeal}
                className="bg-white border border-gray-200 rounded-sm"
              >
                <div className="flex items-center p-4">
                  <div className="w-16 h-16 flex-shrink-0 mr-4">
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="w-full h-full object-cover rounded-sm"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {recipe.strMeal}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleRemoveFromWishList(recipe.idMeal)}
                    className="text-gray-400 hover:text-gray-600 text-xs ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
