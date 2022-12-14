import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getAllBeersIds, getBeerById } from 'lib/beers';
import { Beer } from 'lib/types';
import React, { ReactElement } from 'react';
import Head from 'next/head';
import OrangeWaveWrapper from 'components/molecules/OrangeWaveWrapper';
import SectionTitle from 'components/atoms/SectionTitle';
import FancySectionTitle from 'components/atoms/FancySectionTitle';
import FallbackBeer from 'public/images/fallback-beer.png';
import InstaxImage from 'components/molecules/InstaxImage';
import MoreDetails from 'components/molecules/MoreDetails';
import FavoritesComponent from 'components/organisms/FavoritesComponent';
import Arrow from 'public/icons/arrow.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import DefaultLayout from 'components/templates/DefaultLayout';

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

  if (!beer) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      beer,
    },
  };
};

export default function BeerPage({ beer }: { beer: Beer }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{beer.name}</title>
        <meta name="description" content={beer.description} />
      </Head>

      <div className="flex flex-col">
        <OrangeWaveWrapper>
          <h1 className="md:mt-12 text-4xl md:text-5xl text-center text-brown-500 font-josefin font-bold">{beer.name}</h1>
          <p className="font-poppins text-gray-600 text-lg font-bold px-8 text-center -mt-3 md:mb-5">{beer.tagline}</p>
          <InstaxImage image={beer.image_url} fallback={FallbackBeer} alt={beer.name} />
          <p className="font-poppins text-gray-600 text-lg font-bold text-center">- {beer.abv}% -</p>
          <div className="flex items-center justify-around md:justify-center gap-16 md:gap-32 mt-5 px-4 rounded-xl shadow-xl bg-white">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center bg-orange-500 md:hover:bg-orange-600 px-2 rounded-xl shadow-lg transition-all duration-300"
            >
              <Image src={Arrow} alt="filled heart" width={40} height={40} />
            </button>
            <div className="translate-y-1">
              <FavoritesComponent beerId={beer.id} size={50} />
            </div>
          </div>
        </OrangeWaveWrapper>

        <div className="px-5 font-poppins text-lg md:grid md:grid-cols-[1fr_0.5fr] xl:grid-cols-[1fr_900px_400px_1fr]">
          <div className="md:col-start-1 xl:col-start-2 md:w-2/3 md:ml-32">
            <SectionTitle>Description</SectionTitle>
            <p className="mb-9">{beer.description}</p>
          </div>

          {beer.food_pairing.length > 0 && (
            <div className="md:col-start-1 xl:col-start-2 md:w-2/3 md:ml-32">
              <SectionTitle>Try with</SectionTitle>
              <ul className="mb-9 list-disc list-inside space-y-2">
                {beer.food_pairing.map((food: string, index: number) => (
                  <li key={index}>{food}</li>
                ))}
              </ul>
            </div>
          )}

          {(beer.ingredients.malt.length > 0 || beer.ingredients.hops.length > 0) && (
            <div className="md:col-start-2 xl:col-start-3 md:row-start-1 md:row-span-6 md:border-l-2 md:pl-8 md:mb-9 md:h-fit">
              <SectionTitle>Ingredients</SectionTitle>
              <ul className="mb-9 list-disc list-inside space-y-4">
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
            </div>
          )}

          {beer.brewers_tips && (
            <div className="md:col-start-1 xl:col-start-2 md:w-2/3 md:ml-32">
              <FancySectionTitle>Good to know</FancySectionTitle>
              <p className="mb-9">{beer.brewers_tips}</p>
            </div>
          )}

          <div className="mb-9 md:col-start-1 xl:col-start-2 md:w-2/3 md:ml-32">
            <MoreDetails>
              <ul className="w-full">
                <li className="border-y-2 p-2 flex justify-between">
                  First brewed: <span className="font-bold">{beer.first_brewed || '-'}</span>
                </li>
                <li className="border-b-2 p-2 flex justify-between">
                  IBU: <span className="font-bold">{beer.ibu || '-'}</span>
                </li>
                <li className="border-b-2 p-2 flex justify-between">
                  Target FG: <span className="font-bold">{beer.target_fg || '-'}</span>
                </li>
                <li className="border-b-2 p-2 flex justify-between">
                  Target OG: <span className="font-bold">{beer.target_og || '-'}</span>
                </li>
                <li className="border-b-2 p-2 flex justify-between">
                  EBC: <span className="font-bold">{beer.ebc || '-'}</span>
                </li>
                <li className="border-b-2 p-2 flex justify-between">
                  SRM: <span className="font-bold">{beer.srm || '-'}</span>
                </li>
                <li className="border-b-2 p-2 flex justify-between">
                  pH: <span className="font-bold">{beer.ph || '-'}</span>
                </li>
                <li className="border-b-2 p-2 flex justify-between">
                  Attenuation level: <span className="font-bold">{beer.attenuation_level || '-'}</span>
                </li>
                <li className="border-b-2 p-2 flex justify-between">
                  Volume:
                  <span className="font-bold">
                    {beer.volume.value || '-'} {beer.volume.unit}
                  </span>
                </li>
                <li className="border-b-2 p-2 flex justify-between">
                  Boil volume:
                  <span className="font-bold">
                    {beer.boil_volume.value || '-'} {beer.boil_volume.unit}
                  </span>
                </li>
                <li className="border-b-2 p-2 flex justify-between">
                  Mash temp:
                  <span className="font-bold">
                    {beer.method.mash_temp[0].temp.value || '-'} {beer.method.mash_temp[0].temp.unit} / {beer.method.mash_temp[0].duration || '-'}
                  </span>
                </li>
                <li className="border-b-2 p-2 flex justify-between">
                  Fermentation:
                  <span className="font-bold">
                    {beer.method.fermentation.temp.value || '-'} {beer.method.fermentation.temp.unit}
                  </span>
                </li>
                <li className="border-b-2 p-2 flex flex-col">
                  Twist:
                  <span className="font-bold">{beer.method.twist || '-'}</span>
                </li>
              </ul>
            </MoreDetails>
          </div>
        </div>
      </div>
    </>
  );
}

BeerPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <DefaultLayout>{page}</DefaultLayout>
    </>
  );
};
