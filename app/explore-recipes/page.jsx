"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import HttpKit from "@/common/helpers/HttpKit";
import Loading from "@/components/Common/Loading";
import Error from "@/components/Common/Error";
import RecipeSubmissionForm from "@/components/Recipes/RecipeSubmissionForm";
import Recipe from "@/components/Recipes/Recipe";

const ExploreRecipesPage = () => {
  const page = 1;
  const limit = 10;

  const {
    data: recipes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => HttpKit.getRecipes(page, limit),
  });

  if (isLoading) {
    return (
      <Loading>
        <p className="text-gray-600">Loading recipes...</p>
      </Loading>
    );
  }

  if (error) {
    return (
      <Error message="Something went wrong while loading recipes. Please try again." />
    );
  }

  return (
    <>
      <div className="min-h-screen mt-20 bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div className="">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Explore Recipes
              </h1>
              <p className="text-gray-600">
                Discover delicious recipes from our collection
              </p>
            </div>
            <div>
              <RecipeSubmissionForm />
            </div>
          </div>

          {recipes && recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <Recipe recipe={recipe} />
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
                No recipes available
              </h3>
              <p className="text-gray-600">
                Check back later for new recipes or try refreshing the page.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExploreRecipesPage;
