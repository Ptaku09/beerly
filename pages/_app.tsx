import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import FavoriteBeersProvider from 'providers/FavoriteBeersProvider';

export type NextPageWithLayout = NextPage & { getLayout?: (page: ReactElement) => ReactNode };
type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout || ((page: ReactElement) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteBeersProvider>{getLayout(<Component {...pageProps} />)}</FavoriteBeersProvider>
    </QueryClientProvider>
  );
}
