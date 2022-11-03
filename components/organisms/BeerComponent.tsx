import React from 'react';
import { Beer } from 'lib/types';
import FallbackBeer from 'public/images/fallback-beer.png';
import InstaxImageSmall from 'components/molecules/InstaxImageSmall';
import FavoritesComponent from 'components/organisms/FavoritesComponent';
import Link from 'next/link';

const BeerComponent = ({ beerData }: { beerData: Beer }) => {
  return (
    <div className="grid grid-cols-[50px_1fr] py-2 border-2 rounded-xl font-poppins shadow-md">
      <div className="flex items-center justify-center border-r-2 mr-2">
        <FavoritesComponent beerId={beerData.id} size={25} />
      </div>
      <Link href={`/beers/${beerData.id}`}>
        <div className="grid grid-cols-[0.5fr_1fr]">
          <InstaxImageSmall image={beerData.image_url} fallback={FallbackBeer} alt={beerData.name} />
          <div className="flex items-start justify-center flex-col px-2">
            <p className="font-josefin font-bold text-lg leading-5">{beerData.name}</p>
            <p className="text-xs text-gray-600 my-2">{beerData.tagline}</p>
            <p className="text-xs font-bold">- {beerData.abv}% -</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BeerComponent;
