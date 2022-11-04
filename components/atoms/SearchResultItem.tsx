import React from 'react';
import Image from 'next/image';
import FallbackBeer from 'public/images/fallback-beer.png';
import Link from 'next/link';

const SearchResultItem = ({ id, name, imageUrl }: { id: number; name: string; imageUrl: string | null }) => {
  return (
    <Link href={`/beers/${id}`}>
      <div className="border-b-2 py-5 px-4 grid grid-cols-[0.4fr_1fr] md:hover:bg-slate-200 transition-all duration-300">
        <div className="relative w-16 h-16">
          <Image src={imageUrl || FallbackBeer} alt={name} fill sizes="20vw" className="object-contain" />
        </div>
        <div className="flex items-center">
          <p className="text-bold font-josefin text-lg">{name}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultItem;
