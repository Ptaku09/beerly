import React from 'react';
import WaveWhite from '../atoms/WaveWhite';
import WaveOrange from '../atoms/WaveOrange';

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
