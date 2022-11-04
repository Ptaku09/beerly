import React, { ReactNode } from 'react';
import Navbar from 'components/molecules/Navbar';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-16">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default DefaultLayout;
