import React, { ReactNode } from 'react';
import Navbar from 'components/molecules/Navbar';
import Footer from 'components/molecules/Footer';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-16 pb-16 min-h-screen relative">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
