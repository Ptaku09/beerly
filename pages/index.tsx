import Head from 'next/head';
import { ReactElement } from 'react';
import Title from 'components/atoms/Title';
import Subtitle from 'components/atoms/Subtitle';
import DoubleWaveWrapper from 'components/molecules/DoubleWaveWrapper';
import { useInfiniteQuery } from 'react-query';
import { Beer } from 'lib/types';
import { getBeersByPage } from 'lib/beers';

type PageData = {
  data: Beer[];
  pageParam: number;
};

export default function Home() {
  const { data, fetchNextPage } = useInfiniteQuery('beers', getBeersByPage, {
    getNextPageParam: (lastPage: PageData) => {
      if (lastPage.data.length < 25) return undefined;

      return lastPage.pageParam + 1;
    },
  });

  const handleLoadMore = async () => await fetchNextPage();

  return (
    <>
      <Head>
        <title>Beerly</title>
        <meta name="description" content="Your beer library" />
      </Head>

      <main>
        <DoubleWaveWrapper>
          <div className="flex justify-center items-center flex-col">
            <Title>Beerly.</Title>
            <Subtitle>Your beer library</Subtitle>
          </div>
        </DoubleWaveWrapper>
        <div>{data?.pages.map((page: PageData) => page.data.map((beer: Beer) => <p key={beer.name}>{beer.name}</p>))}</div>
        <button onClick={handleLoadMore}>Load more</button>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
