import { ReactElement } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Beer } from 'lib/types';
import { BEERS_PER_PAGE, getBeersByPage } from 'lib/beers';
import InfiniteScroll from 'react-infinite-scroll-component';
import DoubleWaveWrapper from 'components/molecules/DoubleWaveWrapper';
import Title from 'components/atoms/Title';
import Subtitle from 'components/atoms/Subtitle';
import Head from 'next/head';

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
            <div className="flex flex-col overflow-auto">
              {data?.pages.map((page: PageData) =>
                page.data.map((beer: Beer) => (
                  <div key={beer.id} className="text-3xl py-20">
                    <p>{beer.name}</p>
                  </div>
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
