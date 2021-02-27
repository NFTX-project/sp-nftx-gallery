import React from 'react';
import { useFundsContext } from '../contexts/funds';
import HomeContainer from '@/containers/Home';
import { GetServerSideProps } from 'next';
import { Collection } from '@/types/wp';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    'https://cms.nftx.xyz/wp-json/wp/v2/collections/?_fields=title,slug,acf.collection_title,acf.collection_feature_image,acf.collection_related_fund_vault_ids'
  );
  const collections = (await res.json()) as Collection[];

  return {
    props: {
      collections,
    },
  };
};

const HomePage = ({ collections }: { collections: Collection[] }) => {
  const funds = useFundsContext();
  return (
    <>
      <HomeContainer funds={funds} collections={collections || []} />
    </>
  );
};

export default HomePage;
