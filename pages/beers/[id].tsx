import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getAllBeersIds, getBeerById } from 'lib/beers';
import { Beer } from 'lib/types';

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
    <div>
      <h1>{beer.name}</h1>
    </div>
  );
}
