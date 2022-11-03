import Head from 'next/head';
import OrangeWaveWrapper from 'components/molecules/OrangeWaveWrapper';
import { useContext, useEffect, useState } from 'react';
import { Beer } from 'lib/types';
import BeerComponent from 'components/organisms/BeerComponent';
import Link from 'next/link';
import BeerComponentLoader from 'components/organisms/BeerComponentLoader';
import { FavoriteBeersContext } from 'providers/FavoriteBeersProvider';
import { getBeerById } from 'lib/beers';

export default function Favorites() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [beers, setBeers] = useState<Beer[]>([]);
  const { favoriteBeersIds } = useContext(FavoriteBeersContext);

  const fetchBeers = async (ids: number[]) => {
    const beersRes = ids.map(async (id: number) => getBeerById(String(id)));
    const fetchedBeers = await Promise.all(beersRes);

    setBeers(fetchedBeers);
  };

  useEffect(() => {
    fetchBeers(favoriteBeersIds)
      .catch(() => {
        setBeers([]);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }, [favoriteBeersIds]);

  return (
    <>
      <Head>
        <title>Beerly - favorites</title>
        <meta name="description" content="Your favorite beers" />
      </Head>

      <>
        <OrangeWaveWrapper>
          <h1 className="w-screen text-center text-brown-500 text-5xl font-josefin font-bold">Favorites</h1>
        </OrangeWaveWrapper>

        <div className="grid grid-cols-1 gap-5 px-4 pb-9">
          {isLoading && (
            <>
              <BeerComponentLoader />
              <BeerComponentLoader />
            </>
          )}
          {!isLoading && beers.length === 0 && (
            <div className="font-josefin flex items-center justify-center flex-col">
              <h4 className="text-center text-2xl font-josefin font-bold">You have any favorites yet</h4>
              <Link href="/">
                <p className="text-blue-700 text-lg">find some here</p>
              </Link>
            </div>
          )}
          {beers.map((beer: Beer) => (
            <BeerComponent key={beer.id} beerData={beer} />
          ))}
        </div>
      </>
    </>
  );
}
