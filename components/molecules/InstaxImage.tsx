import React from 'react';
import Image, { StaticImageData } from 'next/image';
import WaveWhite from 'components/atoms/WaveWhite';

type Props = {
  image: StaticImageData | string | null;
  fallback: StaticImageData | string;
  alt: string;
};

const InstaxImage = ({ image, fallback, alt }: Props) => {
  return (
    <div className="w-fit p-4 border-8 border-white shadow-lg bg-orange-200 relative overflow-hidden">
      <div className="relative w-44 h-44 z-10">
        <Image src={image || fallback} alt={alt} fill className="object-contain" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-0.5 rotate-180">
        <WaveWhite />
      </div>
    </div>
  );
};

export default InstaxImage;
