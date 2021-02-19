import React from 'react';
import Link from 'next/link';
import useMessage from '@/hooks/message';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12 text-gray-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="inline-flex mt-4">
            <Link href="/">
              <a rel="noopener noreferrer" className="flex items-center">
                <img
                  src="/images/logo_on_black.svg"
                  className="mx-auto md:pb-0 h-10 mr-2"
                  alt="NFTX icon"
                />
                <img
                  src="/images/nftx_on_black.svg"
                  className="mx-auto md:pb-0 h-5"
                  alt="NFTX logo"
                />
              </a>
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap content-center justify-center h-full text-white text-bold">
            <Link href="https://twitter.com/NFTX_">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {useMessage('footer.link.twitter')}
              </a>
            </Link>
            <Link href="https://github.com/NFTX-project">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline ml-4"
              >
                {useMessage('footer.link.github')}
              </a>
            </Link>
            <Link href="https://blog.nftx.org/">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline ml-4"
              >
                {useMessage('footer.link.blog')}
              </a>
            </Link>
            <Link href="https://discord.com/invite/hytQVM5ZxR">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline ml-4"
              >
                {useMessage('footer.link.discord')}
              </a>
            </Link>
            <Link href="https://forum.nftx.org/">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline ml-4"
              >
                {useMessage('footer.link.forum')}
              </a>
            </Link>
            <Link href="https://client.aragon.org/#/nftx/">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline ml-4"
              >
                {useMessage('footer.link.aragon')}
              </a>
            </Link>
          </div>
        </div>
        <div className="md:text-right text-center pt-4 md:pt-0 text-sm">
          {useMessage('footer.text.data', {
            opensea: (
              <Link href="https://opensea.io/">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:underline"
                >
                  {useMessage('footer.link.opensea')}
                </a>
              </Link>
            ),
            covalent: (
              <Link href="https://covalenthq.com/">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:underline"
                >
                  {useMessage('footer.link.covalent')}
                </a>
              </Link>
            ),
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
