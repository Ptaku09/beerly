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
      className={`fixed z-30 top-0 md:grid md:grid-cols-[0.1fr_1fr_0.1fr] xl:grid-cols-[1fr_1300px_1fr] bg-white w-full h-16 shadow-xl font-josefin transition-all duration-300 ${
        scrollDirection === ScrollDirection.DOWN ? 'translate-y-0' : '-translate-y-16'
      }`}
    >
      <ul className="h-full flex justify-around items-center md:col-start-2 text-xl text-brown-500 transition-all duration-300">
        <li className="md:hover:bg-slate-200 md:hover:-translate-y-0.5 md:rounded-xl md:transition-all md:duration-300">
          <Link className="md:px-4" href="/">
            Home
          </Link>
        </li>
        <li className="hidden md:inline-block w-96">
          <SearchBar />
        </li>
        <li className="md:hover:bg-slate-200 md:hover:-translate-y-0.5 md:rounded-xl md:transition-all md:duration-300">
          <Link className="md:px-4" href="/favorites">
            Favorites
          </Link>
        </li>
        <li className="md:hidden">
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
