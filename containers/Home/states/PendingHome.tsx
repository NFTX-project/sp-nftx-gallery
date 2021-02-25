import React from 'react';
import useMessage from '@/hooks/useMessage';

const PendingHomeContainer = () => (
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
);

export default PendingHomeContainer;
