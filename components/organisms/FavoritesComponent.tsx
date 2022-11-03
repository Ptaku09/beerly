import React, { useContext, useEffect, useState } from 'react';
import HeartFilled from 'public/icons/heart-filled.svg';
import HeartUnfilled from 'public/icons/heart-unfilled.svg';
import Image from 'next/image';
import { FavoriteBeersContext } from 'providers/FavoriteBeersProvider';

const FavoritesComponent = ({ beerId, size = 20 }: { beerId: number; size?: number }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { favoriteBeersIds, handleFavoriteBeer } = useContext(FavoriteBeersContext);

  useEffect(() => {
    favoriteBeersIds.some((id: number) => id === beerId) ? setIsFavorite(true) : setIsFavorite(false);
  }, [beerId, favoriteBeersIds]);

  return (
    <div>
      <button onClick={() => handleFavoriteBeer(beerId)} className="md:hover:-translate-y-0.5 md:transition-all md:duration-300">
        {isFavorite ? (
          <Image src={HeartFilled} alt="filled heart" width={size} height={size} />
        ) : (
          <Image src={HeartUnfilled} alt="unfilled heart" width={size} height={size} />
        )}
      </button>
    </div>
  );
};

export default FavoritesComponent;
