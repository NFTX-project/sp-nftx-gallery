import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import CollectionTemplate from '@/components/templates/Collection';
import { useFundsContext } from '@/contexts/funds';
import { Collection } from '@/types/wp';
import buildYoastMeta from '@/utils/buildYoastMeta';
import { WORDPRESS_CMS } from '@/constants/api';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params.collection;

  const res = await fetch(
    `${WORDPRESS_CMS}/collections/?slug=${slug}&_fields=title,slug,acf.collection_title,acf.collection_description,acf.collection_related_fund_vault_ids,yoast_meta,yoast_title`
  );
  const collection = (await res.json()) as Collection[];

  if (Array.isArray(collection)) {
    return {
      props: {
        collection: collection[0],
      },
    };
  }

  return {
    props: {
      collection: null,
    },
  };
};

const CollectionPage = ({ collection }: { collection: Collection }) => {
  const funds = useFundsContext();
  const [collectionFunds, setCollectionFunds] = useState(null);

  useEffect(() => {
    if (collection && funds.length) {
      const vaultIds = collection.acf.collection_related_fund_vault_ids.split(
        ','
      );
      const holdings = funds.filter((f) =>
        vaultIds.includes(String(f.vaultId))
      );

      if (holdings.length) {
        setCollectionFunds(holdings);
      } else {
        setCollectionFunds(false);
      }
    }
  }, [collection, funds]);

  return (
    <>
      <Head>
        {buildYoastMeta(collection?.yoast_title, collection?.yoast_meta)}
      </Head>
      <CollectionTemplate collection={collection} funds={collectionFunds} />
    </>
  );
};

export default CollectionPage;
