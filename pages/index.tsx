import { ReactElement } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Beer } from 'lib/types';
import { BEERS_PER_PAGE, getBeersByPage } from 'lib/beers';
import InfiniteScroll from 'react-infinite-scroll-component';
import DoubleWaveWrapper from 'components/molecules/DoubleWaveWrapper';
import Title from 'components/atoms/Title';
import Subtitle from 'components/atoms/Subtitle';
import Head from 'next/head';
import Link from 'next/link';
import BeerComponent from 'components/organisms/BeerComponent';

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

        {status === 'success' && (
          <InfiniteScroll
            dataLength={data?.pages.length * BEERS_PER_PAGE}
            next={fetchNextPage}
            hasMore={hasNextPage || false}
            loader={<h4>loading...</h4>}
          >
            <div className="flex flex-col gap-5 px-4 py-5">
              {data?.pages.map((page: PageData) =>
                page.data.map((beer: Beer) => (
                  <Link key={beer.id} href={`/beers/${beer.id}`}>
                    <BeerComponent beerData={beer} />
                  </Link>
                ))
              )}
            </div>
          </InfiniteScroll>
        )}
      </>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
