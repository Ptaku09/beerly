import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SearchIcon from 'public/icons/search.svg';
import { debounce } from 'lodash';
import { Beer } from 'lib/types';
import { getBeersByQuery } from 'lib/beers';
import SearchResults from 'components/molecules/SearchResults';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [foundedBeers, setFoundedBeers] = useState<Beer[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const debouncedSearch = useRef(
    debounce(async (query: string) => {
      if (query.length <= 1) {
        return setFoundedBeers([]);
      }

      setFoundedBeers(await getBeersByQuery(query));
    }, 300)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Hide results on route change
  useEffect(() => {
    setInputValue('');
    setFoundedBeers([]);
  }, [router.asPath]);

  useOnClickOutside(ref, () => {
    setFoundedBeers([]);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div ref={ref} className="md:w-full relative z-20 mx-4 py-1 flex justify-start items-center font-poppins border-2 rounded-xl">
      <div className="relative z-20 px-2">
        <Image src={SearchIcon} alt="search icon" width={30} height={30} />
      </div>
      <input
        className="w-full h-full absolute z-10 pl-11 py-4 rounded-xl outline-orange-500"
        type="text"
        value={inputValue}
        maxLength={30}
        onChange={handleInputChange}
        onFocus={(e: React.ChangeEvent<HTMLInputElement>) => debouncedSearch(e.target.value)}
        placeholder="Search..."
      />
      {foundedBeers.length > 0 && <SearchResults beers={foundedBeers} />}
    </div>
  );
};

export default SearchBar;
