import React from 'react';
import Image from 'next/image';
import DoubleArrow from 'public/icons/double-arrow.svg';
import useScroll, { ScrollDirection } from 'hooks/useScroll';

const ScrollToTopButton = () => {
  const { scrollDirection, scrollToTop } = useScroll();

  return (
    <button
      onClick={scrollToTop}
      className={`fixed z-30 bottom-4 right-4 p-1 bg-orange-500 rounded-lg shadow-xl transition-all duration-300 ${
        scrollDirection === ScrollDirection.UP ? 'translate-x-0' : 'translate-x-16'
      }`}
    >
      <Image src={DoubleArrow} width={30} height={30} alt="double arrow top" className="rotate-180" />
    </button>
  );
};

export default ScrollToTopButton;
