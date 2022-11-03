import { ReactElement } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Beer } from 'lib/types';
import { BEERS_PER_PAGE, getBeersByPage } from 'lib/beers';
import InfiniteScroll from 'react-infinite-scroll-component';
import DoubleWaveWrapper from 'components/molecules/DoubleWaveWrapper';
import Title from 'components/atoms/Title';
import Subtitle from 'components/atoms/Subtitle';
import Head from 'next/head';
import BeerComponent from 'components/organisms/BeerComponent';
import InfiniteScrollLoader from 'components/organisms/InfiniteScrollLoader';

type PageData = {
  data: Beer[];
  pageParam: number;
};

export default function Home() {
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery('beers', getBeersByPage, {
    getNextPageParam: (lastPage: PageData) => {
      if (lastPage.data.length < BEERS_PER_PAGE) return undefined;

      return lastPage.pageParam + 1;
    },
  });

  return (
    <>
      <Head>
        <title>Beerly</title>
        <meta name="description" content="Your beer library" />
      </Head>

      <>
        <DoubleWaveWrapper>
          <div className="flex justify-center items-center flex-col">
            <Title>Beerly.</Title>
            <Subtitle>Your beer library</Subtitle>
          </div>
        </DoubleWaveWrapper>

        <div className="md:grid md:grid-cols-[0.1fr_1fr_0.1fr] xl:grid-cols-[1fr_1300px_1fr] md:-mt-16 xl:-mt-28">
          {status === 'success' && (
            <div className="md:col-start-2">
              <InfiniteScroll
                dataLength={data?.pages.length * BEERS_PER_PAGE}
                next={fetchNextPage}
                hasMore={hasNextPage || false}
                loader={<InfiniteScrollLoader />}
              >
                <div className="flex flex-col gap-5 px-4 py-5 lg:grid lg:grid-cols-2">
                  {data?.pages.map((page: PageData) => page.data.map((beer: Beer) => <BeerComponent key={beer.id} beerData={beer} />))}
                </div>
              </InfiniteScroll>
            </div>
          )}
        </div>
      </>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
