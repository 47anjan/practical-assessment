"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Loading from "@/components/Common/Loading";
import Error from "@/components/Common/Error";
import RecipeSubmissionForm from "@/components/Recipes/RecipeSubmissionForm";
import Recipe from "@/components/Recipes/Recipe";
import { BASE_URL } from "@/utils/constants";

const ExploreRecipesPage = () => {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);
  const pageRef = useRef(1);

  const fetchRecipes = useCallback(
    async (pageNum, isInitial = false) => {
      if (loadingMore && !isInitial) return;

      try {
        if (isInitial) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const response = await fetch(
          `${BASE_URL}/api/recipes?page=${pageNum}&limit=10`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch recipes`);
        }

        const result = await response.json();

        if (result.length === 0) {
          setHasMore(false);
        } else {
          setRecipes((prevRecipes) =>
            isInitial ? result : [...(prevRecipes || []), ...result]
          );
        }

        if (isInitial) {
          setLoading(false);
        } else {
          setLoadingMore(false);
        }
      } catch (err) {
        setLoading(false);
        setLoadingMore(false);

        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        console.error("Error fetching recipes:", err);
      }
    },
    [loadingMore]
  );

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !loadingMore && !loading) {
            const nextPage = pageRef.current + 1;
            pageRef.current = nextPage;
            fetchRecipes(nextPage, false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "20px",
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [fetchRecipes, hasMore, loadingMore, loading]);

  useEffect(() => {
    fetchRecipes(1, true);
  }, []);

  if (loading) {
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
                <Recipe key={recipe._id} recipe={recipe} />
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

          {loadingMore && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            </div>
          )}

          {hasMore && !loadingMore && (
            <div
              ref={observerRef}
              className="h-10 flex items-center justify-center"
            >
              <div className="text-slate-400 text-sm">Loading more...</div>
            </div>
          )}

          {!hasMore && recipes.length > 0 && (
            <div className="text-center py-8">
              <p className="text-slate-500 text-sm">
                You&apos;ve reached the end of the recipes
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExploreRecipesPage;
