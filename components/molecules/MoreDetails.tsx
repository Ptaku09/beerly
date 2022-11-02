import React, { ReactElement, useState } from 'react';
import Image from 'next/image';
import DoubleArrow from 'public/icons/double-arrow.svg';

const MoreDetails = ({ children }: { children: ReactElement }) => {
  const [isDetailsShown, setIsDetailsShown] = useState<boolean>(false);

  return (
    <div className="w-full flex items-center justify-start flex-col gap-5 mb-9">
      {isDetailsShown && children}
      <button
        onClick={() => setIsDetailsShown((prevState: boolean) => !prevState)}
        className="bg-orange-500 px-6 py-2 rounded-full shadow-lg text-white flex items-center justify-center flex-row gap-2"
      >
        {isDetailsShown ? (
          <>
            <span>Less details</span>
            <Image src={DoubleArrow} alt="double arrow" width={25} height={25} className="rotate-180" />
          </>
        ) : (
          <>
            <span>More details</span>
            <Image src={DoubleArrow} alt="double arrow" width={25} height={25} />
          </>
        )}
      </button>
    </div>
  );
};

export default MoreDetails;
