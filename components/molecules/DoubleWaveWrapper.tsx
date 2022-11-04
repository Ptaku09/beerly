import React, { ReactElement } from 'react';
import WaveWhite from 'components/atoms/WaveWhite';
import WaveOrange from 'components/atoms/WaveOrange';

const DoubleWaveWrapper = ({ children }: { children: ReactElement | ReactElement[] }) => {
  return (
    <>
      <div className="relative z-10 lg:-mt-16 2xl:-mt-32 bg-orange-500 flex items-center justify-start flex-col gap-2 pb-7">
        <div className="-translate-y-0.5">
          <WaveWhite />
        </div>
        <div className="absolute -bottom-10 md:bottom-0 z-10">{children}</div>
      </div>
      <div className="relative z-0 -translate-y-0.5 md:-translate-y-14">
        <WaveOrange />
      </div>
    </>
  );
};

export default DoubleWaveWrapper;
