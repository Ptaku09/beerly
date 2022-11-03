import React from 'react';
import Image, { StaticImageData } from 'next/image';
import WaveWhite from 'components/atoms/WaveWhite';

type Props = {
  image: StaticImageData | string | null;
  fallback: StaticImageData | string;
  alt: string;
};

const InstaxImageSmall = ({ image, fallback, alt }: Props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative overflow-hidden flex items-center justify-center w-fit h-fit p-2 bg-orange-200 border-4 border-white shadow-md">
        <div className="relative z-10 w-24 h-24">
          <Image src={image || fallback} alt={alt} fill sizes="30vw" className="object-contain" />
        </div>
        <div className="absolute top-0 -translate-y-0.5">
          <WaveWhite />
        </div>
      </div>
    </div>
  );
};

export default InstaxImageSmall;
