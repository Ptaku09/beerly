import React from 'react';
import WaveWhite from 'components/atoms/WaveWhite';
import WaveOrange from 'components/atoms/WaveOrange';

const HomePageBackground = () => {
  return (
    <>
      <div className="w-screen h-72 bg-orange-500" />
      <WaveWhite />
      <WaveOrange />
    </>
  );
};

export default HomePageBackground;
