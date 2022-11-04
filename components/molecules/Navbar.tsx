import React from 'react';
import useScroll, { ScrollDirection } from 'hooks/useScroll';
import Link from 'next/link';

const Navbar = () => {
  const { scrollDirection } = useScroll();

  return (
    <nav
      className={`fixed z-30 top-0 bg-white w-full h-16 shadow-xl font-josefin transition-all duration-300 ${
        scrollDirection === ScrollDirection.DOWN ? 'translate-y-0' : '-translate-y-16'
      }`}
    >
      <ul className="h-full flex justify-around items-center text-xl text-brown-500">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/favorites">Favorites</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
