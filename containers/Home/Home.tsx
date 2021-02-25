import React from 'react';
import Head from 'next/head';
import useMessage from '@/hooks/useMessage';
import { Fund } from '@/types/fund';
import PendingHomeContainer from './states/PendingHome';
import DefaultHomeContainer from './states/DefaultHome';
import { Collection } from '@/types/wp';

const HomeContainer = ({
  funds,
  collections,
}: {
  funds: Fund[];
  collections: Collection[];
}) => {
  return (
    <>
      <Head>
        <title>{useMessage('home.meta.title')}</title>
      </Head>
      <div className="container mx-auto pt-24 pb-18 px-4">
        {funds.length ? (
          <DefaultHomeContainer funds={funds} collections={collections} />
        ) : (
          <PendingHomeContainer />
        )}
      </div>
    </>
  );
};

export default HomeContainer;
