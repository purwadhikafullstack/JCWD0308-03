import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { CalendarPick } from './CalenderPick';
import ProvinceSelect from './InputSelectLocation';

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
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const [selectedProvince, setSelectedProvince] = useState<string>('');

  return (
    <form
      onSubmit={handleSearch}
      className="border-[2px] border-[#00a7c4] py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer flex items-center bg-white"
    >
      <div className="flex flex-row items-center justify-between w-full">
        <div className="hidden sm:block text-sm font-semibold px-6 text-[#4a4a4a]">
          {/* <ProvinceSelect selectedProvince={selectedProvince} setSelectedProvince={setSelectedProvince} /> */}
          Any Where
        </div>
        <div className=" hidden sm:block text-sm font-semibold px-6 border-x-[2px] flex-1 text-center text-[#4a4a4a]">
          <CalendarPick setDate={setDate} date={date}/>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Where to?"
          className="flex-1 bg-transparent outline-none text-[#4a4a4a] px-4 py-2"
        />
      </div>
      <button
        type="submit"
        className="p-2 bg-[#00a7c4] rounded-full text-white mr-2"
      >
        <BiSearch size={18} />
      </button>
    </form>
  );
};

export default Search;
