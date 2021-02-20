import React, { useEffect, useState } from 'react';
import useMessage from '@/hooks/useMessage';
import { useRouter } from 'next/router';
import collections from '@/constants/collections';
import CollectionContainer from '@/containers/Collection';
import { useFundsContext } from '@/contexts/funds';
import { getFundKey } from '@/utils/getFundKey';

const CollectionsPage = () => {
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

export default CollectionsPage;
