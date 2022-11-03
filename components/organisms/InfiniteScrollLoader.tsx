import React from 'react';
import BeerComponentSkeleton from 'components/molecules/BeerComponentSkeleton';

const InfiniteScrollLoader = () => {
  return (
    <>
      <BeerComponentSkeleton />
      <BeerComponentSkeleton />
    </>
  );
};

export default InfiniteScrollLoader;
