import React from 'react';
import { Beer } from 'lib/types';
import Image from 'next/image';
import Heart from 'public/icons/heart-filled.svg';
import FallbackBeer from 'public/images/fallback-beer.png';
import InstaxImageSmall from 'components/molecules/InstaxImageSmall';

const BeerComponent = ({ beerData }: { beerData: Beer }) => {
  return (
    <div key={beerData.id} className="grid grid-cols-[50px_0.5fr_1fr] py-2 border-2 rounded-xl font-poppins shadow-md">
      <div className="flex items-center justify-center">
        <Image src={Heart} alt="heart" width={20} height={20} />
      </div>
      <InstaxImageSmall image={beerData.image_url} fallback={FallbackBeer} alt={beerData.name} />
      <div className="flex items-start justify-center flex-col px-2">
        <p className="font-josefin font-bold text-lg leading-5">{beerData.name}</p>
        <p className="text-xs text-gray-600 my-2">{beerData.tagline}</p>
        <p className="text-xs font-bold">- {beerData.abv}% -</p>
      </div>
    </div>
  );
};

export default BeerComponent;
