import React, { useState } from 'react';
import Image from 'next/image';
import SearchIcon from 'public/icons/search.svg';

const SearchBar = () => {
  const [searchBarValue, setSearchBarValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBarValue(e.target.value);
  };

  return (
    <div className="md:w-full relative mx-4 py-1 flex justify-start items-center font-poppins border-2 rounded-xl">
      <div className="px-2">
        <Image src={SearchIcon} alt="search icon" width={30} height={30} />
      </div>
      <input
        className="w-full h-full absolute pl-11 py-4 rounded-xl bg-transparent outline-orange-500"
        type="text"
        maxLength={30}
        onChange={handleInputChange}
        value={searchBarValue}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
