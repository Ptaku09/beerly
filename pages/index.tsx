import Head from 'next/head';
import { ReactElement } from 'react';
import Title from 'components/atoms/Title';
import Subtitle from 'components/atoms/Subtitle';
import DoubleWaveWrapper from 'components/molecules/DoubleWaveWrapper';

export default function Home() {
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
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
