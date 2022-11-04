import Head from 'next/head';
import OrangeWaveWrapper from 'components/molecules/OrangeWaveWrapper';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { Beer } from 'lib/types';
import Link from 'next/link';
import BeerComponentLoader from 'components/organisms/BeerComponentLoader';
import { FavoriteBeersContext } from 'providers/FavoriteBeersProvider';
import { getBeerById } from 'lib/beers';
import BeerComponent from 'components/organisms/BeerComponent';
import DefaultLayout from 'components/templates/DefaultLayout';

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
          <h1 className="w-screen text-center text-brown-500 text-5xl md:text-6xl md:translate-y-8 font-josefin font-bold">Favorites</h1>
        </OrangeWaveWrapper>

        <div className="relative z-10 px-4 pb-9 md:grid md:grid-cols-[0.1fr_1fr_0.1fr] xl:grid-cols-[1fr_1300px_1fr] md:-mt-12 xl:-mt-20">
          <div className="col-start-2 xl:grid-cols-2">
            {isLoading && (
              <div className="grid grid-cols-1 gap-5 md:col-start-2 xl:grid-cols-2">
                <BeerComponentLoader />
                <BeerComponentLoader />
              </div>
            )}
            {!isLoading && beers.length === 0 && (
              <div className="md:col-start-2 font-josefin flex items-center justify-center flex-col">
                <h4 className="text-center text-2xl md:text-3xl font-josefin font-bold">You don&apos;t have any favorites yet</h4>
                <Link href="/">
                  <p className="text-blue-700 text-lg md:text-xl md:hover:text-blue-600 md:transition-all md:duration-300">find some here</p>
                </Link>
              </div>
            )}
            <div className="grid grid-cols-1 gap-5 md:col-start-2 xl:grid-cols-2">
              {beers.map((beer: Beer) => (
                <BeerComponent key={beer.id} beerData={beer} />
              ))}
            </div>
          </div>
        </div>
      </>
    </>
  );
}

Favorites.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <DefaultLayout>{page}</DefaultLayout>
    </>
  );
};
