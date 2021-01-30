import React from 'react';
import Logo from '../Logo';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b-2 border-gray-500 border-opacity-30 bg-gray-900">
      <div className="container mx-auto px-4 h-16 md:h-18 flex items-center">
        <div className="py-2">
          <Link href="/">
            <a className="flex items-center">
              <Logo />
              <span className="pl-4 text-gray-50 font-bold text-lg">
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
