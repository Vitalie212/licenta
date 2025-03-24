import React from "react";
import { useSearchParams } from "react-router-dom";
import TireList from "../components/TireList";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-center">
        Rezultate pentru: "{query}"
      </h2>
      <TireList searchQuery={query || ""} />
    </div>
  );
};

export default SearchPage;
