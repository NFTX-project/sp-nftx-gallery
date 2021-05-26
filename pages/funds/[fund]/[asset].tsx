import React from 'react';
import { useRouter } from 'next/router';
import useFund from '@/hooks/useFund';
import useMessage from '@/hooks/useMessage';
import AssetTemplate from '@/components/templates/Asset';

const AssetPage = () => {
  const { query } = useRouter();
  const fund = useFund(query.fund as string);

  if (fund === false) {
    return (
      <div className="container text-center mx-auto px-4 py-20  dark:text-gray-50 text-gray-800">
        <p>{useMessage('fund.notfound')}</p>
      </div>
    );
  }

  if (fund == null) {
    return (
      <div className="container text-center mx-auto px-4 py-20  dark:text-gray-50 text-gray-800">
        <p>{useMessage('fund.loading')}</p>
      </div>
    );
  }

  {
    /* @TODO when we have individual asset pages, ensure they all canonical to the same root */
  }
  {
    /* <link rel="canonical" href={`https://gallery.nftx.org/${category}/${assetKey}`}/> */
  }
  return (
    <AssetTemplate
      assetKey={query.asset as string}
      fundKey={query.fund as string}
      fund={fund}
    />
  );
};

export default AssetPage;
