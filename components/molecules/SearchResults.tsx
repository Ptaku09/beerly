import React from 'react';
import { Beer } from 'lib/types';
import SearchResultItem from 'components/atoms/SearchResultItem';

const SearchResults = ({ beers }: { beers: Beer[] }) => {
  return (
    <div
      id="search-results"
      className="max-h-[50vh] h-fit w-full absolute inset-y-6 -z-10 p-2 bg-slate-100 overflow-y-auto shadow-xl rounded-b-xl border-x-2 border-b-2 transition-all duration-300"
    >
      {beers.map((beer: Beer) => (
        <SearchResultItem key={beer.id} id={beer.id} name={beer.name} imageUrl={beer.image_url} />
      ))}
    </div>
  );
};

export default SearchResults;
