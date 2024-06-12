// components/Search.tsx
import React from 'react';
import { BiSearch } from 'react-icons/bi';

interface SearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const Search: React.FC<SearchProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}) => {
  return (
    <form
      onSubmit={handleSearch}
      className="border-[2px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer flex items-center"
    >
      <div className="flex flex-row items-center justify-between w-full">
        <div className="hidden sm:block text-sm font-semibold px-6 text-[#4a4a4a]">
          Anywhere
        </div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[2px] flex-1 text-center text-[#4a4a4a]">
          Any Week
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Add Guests"
          className="flex-1 bg-white outline-none text-[#4a4a4a] px-4"
        />
      </div>
      <button
        type="submit"
        className="p-2 bg-[#00a7c4] rounded-full text-white mr-2 md:mr-0 md:ml-2"
      >
        <BiSearch size={18} />
      </button>
    </form>
  );
};

export default Search;
