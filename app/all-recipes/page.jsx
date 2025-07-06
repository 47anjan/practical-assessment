"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HttpKit from "@/common/helpers/HttpKit";
import RecipeCard from "@/components/Recipes/RecipeCard";
import Loading from "@/components/Common/Loading";
import Error from "@/components/Common/Error";

const AllRecipes = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories using React Query
  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => HttpKit.getCategories(),
  });

  const {
    data: recipes = [],
    isLoading: recipesLoading,
    error: recipesError,
  } = useQuery({
    queryKey: ["recipes-by-category", selectedCategory?.strCategory],
    queryFn: () => HttpKit.filterByCategory(selectedCategory.strCategory),
    enabled: !!selectedCategory,
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  if (isLoading) {
    return (
      <Loading>
        <p className=" text-gray-600">Loading categories...</p>
      </Loading>
    );
  }

  // Handle errors
  if (error) {
    return (
      <Error message="Error loading categories. Please try again later." />
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Categories Sidebar */}
          <div className="lg:w-1/3 xl:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Categories
              </h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {categories.map((category) => (
                  <div
                    key={category.idCategory}
                    onClick={() => handleCategoryClick(category)}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedCategory?.idCategory === category.idCategory
                        ? "bg-orange-400 text-white shadow-md"
                        : "hover:bg-orange-50 hover:shadow-sm"
                    }`}
                  >
                    <img
                      src={category.strCategoryThumb}
                      alt={category.strCategory}
                      className="w-12 h-12 object-cover rounded-lg mr-3"
                    />
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${
                          selectedCategory?.idCategory === category.idCategory
                            ? "text-white"
                            : "text-gray-800"
                        }`}
                      >
                        {category.strCategory}
                      </h3>
                      <p
                        className={`text-xs line-clamp-2 ${
                          selectedCategory?.idCategory === category.idCategory
                            ? "text-orange-100"
                            : "text-gray-600"
                        }`}
                      >
                        {category.strCategoryDescription}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recipes Content */}
          <div className="lg:w-2/3 xl:w-3/4 ">
            {!selectedCategory ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-16 w-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Select a Category
                </h3>
                <p className="text-gray-600">
                  Choose a category from the sidebar to explore delicious
                  recipes
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedCategory.strCategory} Recipes
                  </h2>
                  <p className="text-gray-600">
                    Discover delicious{" "}
                    {selectedCategory.strCategory.toLowerCase()} recipes
                  </p>
                </div>

                {recipesError ? (
                  <div className="text-center py-12">
                    <p className="text-red-600 mb-4">
                      Error loading recipes: {recipesError.message}
                    </p>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Back to Categories
                    </button>
                  </div>
                ) : recipesLoading ? (
                  <Loading>
                    <p className="mt-4 text-gray-600">Loading recipes...</p>
                  </Loading>
                ) : recipes.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">
                      No recipes found in this category
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                      <RecipeCard key={recipe.idMeal} recipe={recipe} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRecipes;
