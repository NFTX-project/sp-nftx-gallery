import React from 'react';
import { useFundsContext } from '@/contexts/funds';
import HomeContainer from '@/components/templates/Home';
import { GetServerSideProps } from 'next';
import { Collection } from '@/types/wp';
import { WORDPRESS_CMS } from '@/constants/api';

export const getServerSideProps: GetServerSideProps = async () => {
  let collections;

  try {
    const res = await fetch(
      `${WORDPRESS_CMS}/collections/?_fields=title,slug,acf.collection_title,acf.collection_feature_image,acf.collection_related_fund_vault_ids,acf.collection_feature_homepage&orderby=menu_order&order=asc`
    );

    const json = (await res.json()) as Collection[];
    collections = json.filter((c) => c.acf.collection_feature_homepage);
  } catch {
    collections = null;
  }

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
