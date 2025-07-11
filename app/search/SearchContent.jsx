"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import HttpKit from "@/common/helpers/HttpKit";
import RecipeCard from "@/components/Recipes/RecipeCard";
import Modal from "@/components/Modal";
import SingleRecipe from "@/components/Recipes/SingleRecipe";
import Loading from "@/components/Common/Loading";
import Error from "@/components/Common/Error";
import { useSearchParams } from "next/navigation";

const SearchContent = () => {
  const [searchParams, setSearchParams] = useState({
    query: "",
    type: "name",
  });
  const [openDetails, setOpenDetails] = useState(false);
  const [recipeId, setRecipeId] = useState("");
  const urlParams = useSearchParams();

  const query = urlParams.get("query") || "";
  const type = urlParams.get("type") || "name";

  useEffect(() => {
    setSearchParams({ query, type });
  }, [query, type]);

  const {
    data: recipes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["search-recipes", searchParams.query, searchParams.type],
    queryFn: () => {
      if (searchParams.type === "name") {
        return HttpKit.searchRecipesByName(searchParams.query);
      } else if (searchParams.type === "ingredient") {
        return HttpKit.searchRecipesByIngredient(searchParams.query);
      }
      return [];
    },
    enabled: !!searchParams.query,
  });

  const handleDetailsOpen = (id) => {
    setOpenDetails(true);
    setRecipeId(id);
  };

  if (!searchParams.query) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No search query provided
          </h2>
          <p className="text-gray-600">
            Please provide a search query to find recipes.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Loading>
        <p className="text-gray-600">Searching for recipes...</p>
      </Loading>
    );
  }

  if (error) {
    return (
      <Error message="Something went wrong while searching for recipes. Please try again." />
    );
  }

  return (
    <>
      <div className="min-h-screen mt-10 bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Search Results
            </h1>
            <p className="text-gray-600">
              {type === "name"
                ? `Recipes containing "${query}"`
                : type === "ingredient"
                ? `Recipes with ingredient "${query}"`
                : `Recipes in "${query}" category`}
            </p>
          </div>

          {recipes && recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  handleDetailsOpen={handleDetailsOpen}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No recipes found
              </h3>
              <p className="text-gray-600">
                Try searching with different keywords, ingredients, or
                categories.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal*/}
      <Modal isOpen={openDetails} setIsOpen={setOpenDetails}>
        <SingleRecipe recipeId={recipeId} setIsOpen={setOpenDetails} />
      </Modal>
    </>
  );
};

export default SearchContent;
