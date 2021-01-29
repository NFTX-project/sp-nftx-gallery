import React from 'react';
import Logo from '../Logo';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b-2 border-lightest-gray bg-dark-gray">
      <div className="container mx-auto px-4 h-16 md:h-18 flex items-center">
        <div className="py-2">
          <Link href="/">
            <a className="flex items-center">
              <Logo />
              <span className="pl-4 text-off-white font-bold text-lg">
                {'NFTX'}
              </span>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
