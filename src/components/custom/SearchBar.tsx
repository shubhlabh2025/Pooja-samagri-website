import React from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center w-full border border-[#e7dce5] bg-[#fef7fa] rounded-full px-4 py-2 shadow-sm">
      <input
        type="text"
        placeholder="Search for Products"
        className="flex-grow bg-transparent outline-none text-gray-600 placeholder-gray-500 text-sm"
      />
      <Search className="w-4 h-4 text-gray-800" />
    </div>
  );
};

export default SearchBar;
