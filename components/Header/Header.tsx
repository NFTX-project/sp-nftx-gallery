import React from 'react';
import Logo from '../Logo';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b-2 border-gray-100 bg-white">
      <div className="container mx-auto px-4">
        <div className="py-2">
          <Link href="/">
            <a className="flex items-center">
              <Logo />
              <span className="pl-4">{'Gallery'}</span>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
