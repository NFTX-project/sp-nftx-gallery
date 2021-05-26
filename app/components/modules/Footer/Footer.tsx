import React from 'react';
import Link from 'next/link';
import useMessage from '@/hooks/useMessage';

const Footer = () => {
  return (
    <footer className="dark:bg-gray-900 bg-white py-12 dark:text-gray-50 text-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="inline-flex mt-4">
            <Link href="/">
              <a rel="noopener noreferrer" className="flex items-center">
                <img
                  src="/images/logo_on_white.svg"
                  className="mx-auto md:pb-0 h-10 mr-2 block dark:hidden"
                  alt="NFTX icon"
                />
                <img
                  src="/images/nftx_on_white.svg"
                  className="mx-auto md:pb-0 h-5 block dark:hidden"
                  alt="NFTX logo"
                />
                <img
                  src="/images/logo_on_black.svg"
                  className="mx-auto md:pb-0 h-10 mr-2 dark:block hidden"
                  alt="NFTX icon"
                />
                <img
                  src="/images/nftx_on_black.svg"
                  className="mx-auto md:pb-0 h-5 dark:block hidden"
                  alt="NFTX logo"
                />
              </a>
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap content-center justify-center h-full  dark:text-white text-gray-800 text-bold">
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLScnaUGFuz6-iyLTCeLhcLcFfxAdpPhGzGfxDtET7qgBIJO_xg/viewform">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline dark:text-pink-500 text-pink-600"
              >
                {useMessage('footer.link.request')}
              </a>
            </Link>
            <Link href="https://twitter.com/NFTX_">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline ml-4"
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
            <Link href="https://status.nftx.org">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline ml-4"
              >
                {useMessage('footer.link.status')}
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
                  className="dark:text-gray-300 text-gray-800 hover:underline"
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
                  className="dark:text-gray-300 text-gray-800 hover:underline"
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
