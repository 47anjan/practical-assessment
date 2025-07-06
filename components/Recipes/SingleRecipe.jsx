import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

const SingleRecipe = ({ recipeId, setIsOpen }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe-details", recipeId],
    queryFn: () => HttpKit.getRecipeDetails(recipeId),
  });

  if (isLoading) return <div>Loading recipe details...</div>;
  if (error) return <div>Error loading recipe details: {error.message}</div>;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
      <div>
        <Image src={data?.strMealThumb} width={500} height={500} alt="Image" />
      </div>
      <h2 className="text2xl font-semibold">{data?.strMeal}</h2>
    </div>
  );
};

export default SingleRecipe;
