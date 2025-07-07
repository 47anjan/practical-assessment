import Image from "next/image";
import React from "react";
import ButtonAddToCart from "@/components/Common/ButtonAddToCart";

const RecipeCard = ({ recipe, handleDetailsOpen }) => {
  return (
    <article className="group space-y-6 border border-gray-100  rounded-3xl bg-white  px-4 py-4 text-center shadow hover:shadow-xl transition duration-200 shadow-gray-600/10">
      <div
        className="hover:cursor-pointer "
        onClick={() => handleDetailsOpen(recipe?.idMeal)}
      >
        <Image
          className="mx-auto rounded-2xl"
          src={recipe?.strMealThumb}
          alt="Web Development"
          loading="lazy"
          width={500}
          height={500}
        />
        <h3 className="text-2xl font-semibold text-gray-800">
          {recipe?.strMeal}
        </h3>
        <p>
          Obcaecati, quam? Eligendi, nulla numquam natus laborum porro at cum,
          consectetur ullam tempora ipsa iste officia sed officiis! Incidunt ea
          animi officiis.
        </p>
      </div>

      <div className="relative mx-auto flex items-center justify-center invisible  group-hover:visible">
        <ButtonAddToCart recipe={recipe} />
      </div>
    </article>
  );
};

export default RecipeCard;
