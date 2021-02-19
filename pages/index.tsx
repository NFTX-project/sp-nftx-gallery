import React from 'react';
import Head from 'next/head';
import { useFundsContext } from '../contexts/funds';
import useMessage from '@/hooks/message';
import HomeContainer from '@/containers/Home';

const HomePage = () => {
  const funds = useFundsContext();

  if (funds.length) {
    return <HomeContainer funds={funds} />;
  }

  return (
    <>
      <Head>
        <title>{useMessage('home.meta.title')}</title>
      </Head>
      <div className="flex-1 flex items-center justify-center container mx-auto pt-12 pb-18 px-4">
        <h1 className="text-4xl mb-4 font-bold text-center text-gray-50 animate-pulse">
          <img
            src="/images/logo_on_black.svg"
            className="mx-auto max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl"
            alt="NFTX logo"
          />
          <div className="invisible h-0">{useMessage('home.title')}</div>
        </h1>
      </div>
    </>
  );
};

export default HomePage;
