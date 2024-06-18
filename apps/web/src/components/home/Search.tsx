import React from 'react';
import { BiSearch } from 'react-icons/bi';

export const Search = () => {
  return (
    <div className="border-[2px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="hidden sm:block text-sm font-semibold px-6 text-[#4a4a4a]">
          Anywhere
        </div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[2px] flex-1 text-center text-[#4a4a4a]">
          Any Week
        </div>
        <div className="sm:hidden block text-sm font-semibold px-6 text-[#4a4a4a]">
          Where do you want to go?
        </div>
        <div className="text-sm pl-6 pr-2 text-[#4a4a4a] flex flex-row items-center gap-3">
          <div className="hidden sm:block">Add Guests</div>
          <div className="p-2 bg-[#00a7c4] rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
