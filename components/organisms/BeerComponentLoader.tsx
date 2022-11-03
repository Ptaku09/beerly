import React from 'react';
import BeerComponentSkeleton from 'components/molecules/BeerComponentSkeleton';

const BeerComponentLoader = () => {
  return (
    <>
      <BeerComponentSkeleton />
      <BeerComponentSkeleton />
    </>
  );
};

export default BeerComponentLoader;
