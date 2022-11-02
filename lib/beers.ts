import { Beer } from 'lib/types';

export const getBeersByPage = async ({ pageParam = 1 }) => {
  const res = await fetch(`https://api.punkapi.com/v2/beers?page=${pageParam}`);

  return {
    data: (await res.json()) as Beer[],
    pageParam,
  };
};

export const getAllBeersIds = async (): Promise<string[]> => {
  const ids: string[] = [];
  const res = await fetch('https://api.punkapi.com/v2/beers?page=1&per_page=80');
  let beers: Beer[] = await res.json();
  let i = 2;

  while (beers.length > 0) {
    ids.push(...beers.map((beer: Beer) => beer.id.toString()));

    const res = await fetch(`https://api.punkapi.com/v2/beers?page=${i++}&per_page=80`);
    beers = await res.json();
  }

  return ids;
};

export const getBeerById = async (id: string): Promise<Beer> => {
  const res = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
  const beer: Beer[] = await res.json();

  return beer[0];
};
