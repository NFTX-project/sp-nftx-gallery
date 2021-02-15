import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12 text-gray-500">
      <div className="container flex flex-col md:flex-row justify-between content-center mx-auto px-4">
        <div className="">
          <Link href="/">
            <a rel="noopener noreferrer" className="">
              <img
                src="/images/footer-logo.svg"
                className="mx-auto pb-4 md:pb-0"
              />
            </a>
          </Link>
        </div>
        <div className="flex pt-4 content-center justify-center h-full text-white text-bold">
          <Link href="https://twitter.com/NFTX_">
            <a target="_blank" rel="noopener noreferrer" className="">
              Twitter
            </a>
          </Link>
          <Link href="https://github.com/NFTX-project">
            <a target="_blank" rel="noopener noreferrer" className="ml-4">
              GitHub
            </a>
          </Link>
          <Link href="https://blog.nftx.org/">
            <a target="_blank" rel="noopener noreferrer" className="ml-4">
              Blog
            </a>
          </Link>
          <Link href="https://discord.com/invite/hytQVM5ZxR">
            <a target="_blank" rel="noopener noreferrer" className="ml-4">
              Discord
            </a>
          </Link>
          <Link href="https://client.aragon.org/#/nftx/">
            <a target="_blank" rel="noopener noreferrer" className="ml-4">
              Aragon
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
