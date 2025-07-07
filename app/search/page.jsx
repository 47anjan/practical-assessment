"use client";

import Loading from "@/components/Common/Loading";
import React, { Suspense } from "react";
import SearchContent from "./SearchContent";

const SearchPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <Loading>
            <div className="text-xl">Loading search results...</div>
          </Loading>
        }
      >
        <SearchContent />
      </Suspense>
    </>
  );
};

export default SearchPage;
