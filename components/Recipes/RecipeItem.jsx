const RecipeItem = ({ recipe, handleRemove }) => {
  return (
    <article className="bg-white border border-gray-200 rounded-sm">
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
          onClick={handleRemove}
          className="text-gray-400 hover:text-gray-600 text-xs ml-4"
        >
          Remove
        </button>
      </div>
    </article>
  );
};
export default RecipeItem;
