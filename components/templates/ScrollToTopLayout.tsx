import React, { ReactNode } from 'react';
import ScrollToTopButton from 'components/atoms/ScrollToTopButton';

const ScrollToTopLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main>{children}</main>
      <ScrollToTopButton />
    </>
  );
};

export default ScrollToTopLayout;
