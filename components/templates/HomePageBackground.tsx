import React from 'react';
import WaveWhite from 'components/atoms/WaveWhite';
import WaveOrange from 'components/atoms/WaveOrange';

const HomePageBackground = () => {
  return (
    <>
      <div className="w-screen h-72 bg-orange-500" />
      <div className="absolute top-0 left-0 z-[3]">
        <WaveWhite />
      </div>
      <div className="-translate-y-0.5 absolute top-72 md:top-52 left-0 z-[2]">
        <WaveOrange />
      </div>
    </>
  );
};

export default HomePageBackground;
