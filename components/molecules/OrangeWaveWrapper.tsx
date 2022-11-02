import React, { ReactElement } from 'react';
import WaveOrange from 'components/atoms/WaveOrange';

const MainBeerDataWrapper = ({ children }: { children: ReactElement | ReactElement[] }) => {
  return (
    <>
      <div className="relative z-10 bg-orange-500 flex items-center justify-start flex-col gap-4 py-7">{children}</div>
      <div className="-translate-y-0.5">
        <WaveOrange />
      </div>
    </>
  );
};

export default MainBeerDataWrapper;
