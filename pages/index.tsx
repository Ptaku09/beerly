import Head from 'next/head';
import { ReactElement } from 'react';
import Subtitle from 'components/atoms/Subtitle';
import Title from 'components/atoms/Title';
import HomePageBackground from 'components/templates/HomePageBackground';

export default function Home() {
  return (
    <>
      <Head>
        <title>Beerly</title>
        <meta name="description" content="Your beer library" />
      </Head>

      <main>
        <div className="w-screen absolute top-24 2xl:top-36 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center flex-col">
          <Title>Beerly.</Title>
          <Subtitle>Your beer library</Subtitle>
        </div>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <HomePageBackground />
      {page}
    </>
  );
};
