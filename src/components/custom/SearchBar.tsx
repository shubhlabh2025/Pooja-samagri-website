import React from "react";
import { Search } from "lucide-react";

const SearchBar: React.FC = () => {
  return (
    <div className="flex w-full items-center rounded-full border border-[#e7dce5] bg-[#f0f0f5] px-4 py-2 shadow-sm">
      <input
        type="text"
        placeholder="Search for Products"
        className="flex-grow bg-transparent text-sm text-gray-600 placeholder-gray-500 outline-none"
      />
      <Search className="h-4 w-4 text-gray-800" />
    </div>
  );
};

export default SearchBar;
