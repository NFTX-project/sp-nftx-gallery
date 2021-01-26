
import React from 'react';
import Link from 'next/link';

const Footer = () => {

  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="py-1">
          <Link
            href="https://nftx.org"
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs"
            >
              {'Powered by tokens of the non fungible variety.'}
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
