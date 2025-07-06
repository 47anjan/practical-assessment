"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchForm = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("name");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(
        `/search?query=${encodeURIComponent(
          searchInput.trim()
        )}&type=${searchType}`
      );
      setSearchInput("");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="w-full mt-8">
        {/* Search Type Selector */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-white rounded-full p-1 shadow-md border border-yellow-200">
            {[
              { key: "name", label: "Recipe Name" },
              { key: "ingredient", label: "Ingredient" },
            ].map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setSearchType(key)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  searchType === key
                    ? "bg-yellow-300 text-yellow-900 shadow-sm"
                    : "text-gray-600 hover:text-yellow-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <form action="" className="w-full mt-12">
          <div className="relative flex p-1 rounded-full bg-white   border border-yellow-200 shadow-md md:p-2">
            <input
              placeholder={`Search by ${
                searchType === "name"
                  ? "recipe name"
                  : searchType === "ingredient"
                  ? "ingredient"
                  : "category"
              }...`}
              className="w-full p-4 rounded-full outline-none bg-transparent text-gray-700"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
            />
            <button
              onClick={handleSearch}
              disabled={!searchInput.trim()}
              type="button"
              title="Start searching"
              className="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12  disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="hidden text-yellow-900 font-semibold md:block">
                Search
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 mx-auto text-yellow-900 md:hidden"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
