import { createContext, ReactNode, useEffect, useState } from 'react';

type FavoriteBeersContextType = {
  favoriteBeersIds: number[];
  handleFavoriteBeer: (beerId: number) => void;
};

export const FavoriteBeersContext = createContext<FavoriteBeersContextType>({
  favoriteBeersIds: [],
  handleFavoriteBeer: (beerId: number) => {},
});

const FavoriteBeersProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteBeersIds, setFavoriteBeersIds] = useState<number[]>([]);

  useEffect(() => {
    const favorites = localStorage.getItem('beerly-favorites');

    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);
      setFavoriteBeersIds(parsedFavorites);
    }
  }, []);

  const handleFavoriteBeer = (beerId: number) => {
    const favorites = localStorage.getItem('beerly-favorites');

    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);

      if (parsedFavorites.includes(beerId)) {
        const filteredFavorites = parsedFavorites.filter((favorite: number) => favorite !== beerId);

        localStorage.setItem('beerly-favorites', JSON.stringify(filteredFavorites));
        setFavoriteBeersIds(filteredFavorites);
      } else {
        const newFavorites = [beerId, ...parsedFavorites];

        localStorage.setItem('beerly-favorites', JSON.stringify(newFavorites));
        setFavoriteBeersIds(newFavorites);
      }
    } else {
      localStorage.setItem('beerly-favorites', JSON.stringify([beerId]));
      setFavoriteBeersIds([beerId]);
    }
  };

  return <FavoriteBeersContext.Provider value={{ favoriteBeersIds, handleFavoriteBeer }}>{children}</FavoriteBeersContext.Provider>;
};

export default FavoriteBeersProvider;
