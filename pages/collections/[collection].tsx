import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import CollectionContainer from '@/containers/Collection';
import { useFundsContext } from '@/contexts/funds';
import { Collection } from '@/types/wp';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params.collection;

  const res = await fetch(
    `https://cms.nftx.xyz/wp-json/wp/v2/collections/?slug=${slug}&_fields=title,slug,acf.collection_title,acf.collection_description,acf.collection_feature_image,acf.collection_visible,acf.collection_related_fund_vault_ids,yoast_head`
  );
  const collection = (await res.json()) as Collection[];
  console.log(collection);

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
      <CollectionContainer collection={collection} funds={collectionFunds} />
    </>
  );
};

export default CollectionPage;
