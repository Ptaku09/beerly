import React, { useEffect, useRef, useState } from 'react';
import useScroll, { ScrollDirection } from 'hooks/useScroll';
import Link from 'next/link';
import Image from 'next/image';
import SearchIcon from 'public/icons/search-brown.svg';
import SearchBar from 'components/organisms/SearchBar';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { useRouter } from 'next/router';
import { throttle } from 'lodash';

const Navbar = () => {
  const { scrollDirection } = useScroll();
  const [isSearchBarVisible, setIsSearchBarVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOnClickOutside(ref, () => {
    handleToggleSearchBar();
  });

  useEffect(() => {
    setIsSearchBarVisible(false);
  }, [router.asPath]);

  const handleToggleSearchBar = throttle(
    () => {
      setIsSearchBarVisible((prevState: boolean) => !prevState);
    },
    200,
    { leading: false, trailing: true }
  );

  return (
    <nav
      className={`fixed z-30 top-0 bg-white w-full h-16 shadow-xl font-josefin transition-all duration-300 ${
        scrollDirection === ScrollDirection.DOWN ? 'translate-y-0' : '-translate-y-16'
      }`}
    >
      <ul className="h-full flex justify-around items-center text-xl text-brown-500 transition-all duration-300">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/favorites">Favorites</Link>
        </li>
        <li>
          <button onClick={handleToggleSearchBar} className="flex items-center justify-center">
            <Image src={SearchIcon} alt="search icon" width={25} height={25} />
          </button>
        </li>
      </ul>
      {isSearchBarVisible && (
        <div ref={ref} className="mt-3">
          <SearchBar />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
