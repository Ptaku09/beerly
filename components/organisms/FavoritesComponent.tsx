import React, { useEffect, useState } from 'react';
import HeartFilled from 'public/icons/heart-filled.svg';
import HeartUnfilled from 'public/icons/heart-unfilled.svg';
import Image from 'next/image';

const FavoritesComponent = ({ beerId, size = 20 }: { beerId: number; size?: number }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = localStorage.getItem('beerly-favorites');

    favorites && JSON.parse(favorites).includes(beerId) ? setIsFavorite(true) : setIsFavorite(false);
  }, [beerId]);

  const handleFavorites = () => {
    const favorites = localStorage.getItem('beerly-favorites');

    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);

      if (parsedFavorites.includes(beerId)) {
        const filteredFavorites = parsedFavorites.filter((favorite: number) => favorite !== beerId);

        localStorage.setItem('beerly-favorites', JSON.stringify(filteredFavorites));
        setIsFavorite(false);
      } else {
        localStorage.setItem('beerly-favorites', JSON.stringify([...parsedFavorites, beerId]));
        setIsFavorite(true);
      }
    } else {
      localStorage.setItem('beerly-favorites', JSON.stringify([beerId]));
      setIsFavorite(true);
    }
  };

  return (
    <div>
      <button onClick={handleFavorites}>
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
