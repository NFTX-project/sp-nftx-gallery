import React, { useEffect, useState } from 'react';
import useMessage from '@/hooks/useMessage';
// import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import collections from '@/constants/collections';
import CollectionContainer from '@/containers/Collection';
import { useFundsContext } from '@/contexts/funds';
import { getFundKey } from '@/utils/getFundKey';
// import { Collection } from '@/types/wp';

// export const getServerSideProps: GetServerSideProps = async () => {
//   const res = await fetch(
//     'https://cms.nftx.xyz/wp-json/wp/v2/collections/?_fields=title,slug,acf.collection_title,acf.collection_description,acf.collection_feature_image,acf.collection_visible,acf.collection_related_fund_vault_ids,yoast_head'
//   );
//   const collections = await res.json() as Collection[];

//   return {
//     props: {
//       collections,
//     },
//   };
// };

const CollectionPage = () => {
  const router = useRouter();
  const funds = useFundsContext();
  const [collection, setCollection] = useState(null);
  const collectionPath = router.query.collection as string;

  useEffect(() => {
    if (collectionPath && funds.length) {
      const activeCollection = collections.find(
        (c) => c.href === collectionPath
      );
      const collectionFunds = funds.filter((f) =>
        activeCollection.items.includes(getFundKey(f))
      );

      if (activeCollection) {
        setCollection({
          collection: activeCollection,
          funds: collectionFunds,
        });
      } else {
        setCollection(false);
      }
    }
  }, [collectionPath, funds]);

  if (collection === false) {
    return (
      <div className="container text-center mx-auto px-4 py-20 text-gray-50">
        <p>{useMessage('collection.notfound')}</p>
      </div>
    );
  }

  if (collection == null) {
    return (
      <div className="container text-center mx-auto px-4 py-20 text-gray-50">
        <p>{useMessage('collection.loading')}</p>
      </div>
    );
  }

  return <CollectionContainer {...collection} />;
};

export default CollectionPage;
