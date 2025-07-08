import Image from "next/image";
import React from "react";

const Recipe = ({ recipe }) => {
  return (
    <article className="group relative space-y-6 border border-gray-100  rounded-3xl bg-white  px-4 py-4 text-center shadow hover:shadow-xl transition duration-200 shadow-gray-600/10">
      <div className="hover:cursor-pointer ">
        <Image
          className="mx-auto rounded-2xl"
          src={recipe?.image}
          alt={recipe?.recipeName}
          loading="lazy"
          width={500}
          height={500}
        />
        <h3 className="text-2xl font-semibold text-gray-800">
          {recipe?.recipeName}
        </h3>
        <p>
          Obcaecati, quam? Eligendi, nulla numquam natus laborum porro at cum,
          consectetur ullam tempora ipsa iste officia sed officiis! Incidunt ea
          animi officiis.
        </p>
      </div>
    </article>
  );
};

export default Recipe;
