import React from 'react';
import Link from 'next/link';
import useMessage from '@/hooks/message';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12 text-gray-500">
      <div className="container flex flex-col md:flex-row justify-between content-center mx-auto px-4">
        <div className="">
          <Link href="/">
            <a rel="noopener noreferrer" className="flex items-center">
              <img
                src="/images/logo_on_black.svg"
                className="mx-auto pb-4 md:pb-0 h-10 mr-2"
                alt="NFTX icon"
              />
              <img
                src="/images/nftx_on_black.svg"
                className="mx-auto pb-4 md:pb-0 h-5"
                alt="NFTX logo"
              />
            </a>
          </Link>
        </div>
        <div className="flex pt-4 content-center justify-center h-full text-white text-bold">
          <Link href="https://twitter.com/NFTX_">
            <a target="_blank" rel="noopener noreferrer" className="">
              {useMessage('footer.link.twitter')}
            </a>
          </Link>
          <Link href="https://github.com/NFTX-project">
            <a target="_blank" rel="noopener noreferrer" className="ml-4">
              {useMessage('footer.link.github')}
            </a>
          </Link>
          <Link href="https://blog.nftx.org/">
            <a target="_blank" rel="noopener noreferrer" className="ml-4">
              {useMessage('footer.link.blog')}
            </a>
          </Link>
          <Link href="https://discord.com/invite/hytQVM5ZxR">
            <a target="_blank" rel="noopener noreferrer" className="ml-4">
              {useMessage('footer.link.discord')}
            </a>
          </Link>
          <Link href="https://client.aragon.org/#/nftx/">
            <a target="_blank" rel="noopener noreferrer" className="ml-4">
              {useMessage('footer.link.aragon')}
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
