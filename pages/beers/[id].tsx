import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getAllBeersIds, getBeerById } from 'lib/beers';
import { Beer } from 'lib/types';
import { ReactElement } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import OrangeWaveWrapper from 'components/molecules/OrangeWaveWrapper';
import SectionTitle from 'components/atoms/SectionTitle';
import FancySectionTitle from 'components/atoms/FancySectionTitle';

interface ParamsProps extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllBeersIds();
  const paths = ids.map((id: string) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { id } = context.params as ParamsProps;
  const beer = await getBeerById(id);

  return {
    props: {
      beer,
    },
  };
};

export default function BeerPage({ beer }: { beer: Beer }) {
  return (
    <>
      <Head>
        <title>Beerly - {beer.name}</title>
        <meta name="description" content={beer.description} />
      </Head>

      <>
        <OrangeWaveWrapper>
          <h1 className="text-4xl text-center font-josefin font-bold">{beer.name}</h1>
          <p className="font-poppins text-gray-600 text-lg font-bold px-8 text-center -mt-3">{beer.tagline}</p>
          <div className="w-fit p-4 border-8 border-white shadow-lg bg-orange-200">
            <div className="relative w-44 h-44">
              <Image src={beer.image_url || ''} alt={beer.name} fill className="object-contain" />
            </div>
          </div>
          <p className="font-poppins text-gray-600 text-lg font-bold text-center">- {beer.abv}% -</p>
        </OrangeWaveWrapper>

        <div className="px-5 font-poppins">
          <SectionTitle>Description</SectionTitle>
          <p className="text-lg mb-9">{beer.description}</p>

          {beer.food_pairing.length > 0 && (
            <>
              <SectionTitle>Try with</SectionTitle>
              <ul className="text-lg mb-9 list-disc list-inside space-y-2">
                {beer.food_pairing.map((food: string, index: number) => (
                  <li key={index}>{food}</li>
                ))}
              </ul>
            </>
          )}

          {(beer.ingredients.malt.length > 0 || beer.ingredients.hops.length > 0) && (
            <>
              <SectionTitle>Ingredients</SectionTitle>
              <ul className="text-lg mb-9 list-disc list-inside space-y-4">
                {beer.ingredients.malt.map((malt, index: number) => (
                  <li key={`${malt.name}${index}`}>
                    {malt.name}
                    <ul className="pl-6">
                      <li>
                        <span className="font-bold">
                          {malt.amount.value} {malt.amount.unit}
                        </span>
                      </li>
                    </ul>
                  </li>
                ))}
                {beer.ingredients.hops.map((hop, index: number) => (
                  <li key={`${hop.name}${index}`}>
                    {hop.name}:
                    <ul className="pl-6 space-y-1">
                      <li>
                        <span className="font-bold">
                          {hop.amount.value} {hop.amount.unit}
                        </span>
                      </li>
                      <li>
                        adding time: <span className="font-bold">{hop.add}</span>
                      </li>
                      <li>
                        attribute: <span className="font-bold">{hop.attribute}</span>
                      </li>
                    </ul>
                  </li>
                ))}
                <li className="font-bold">{beer.ingredients.yeast}</li>
              </ul>
            </>
          )}

          {beer.brewers_tips && (
            <>
              <FancySectionTitle>Good to know</FancySectionTitle>
              <p className="text-lg mb-9">{beer.brewers_tips}</p>
            </>
          )}
        </div>
      </>
    </>
  );
}

BeerPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
