import useAxios from 'axios-hooks';
import Head from 'next/head';
import React, { useEffect, useRef } from 'react';
import Breadcrumb from '@/components/modules/Breadcrumbs';
import AssetDetail, {
  AssetDetailStatus,
} from '@/components/modules/AssetDetail';
import AssetGroup from '@/components/modules/AssetGroup';
import useMessage from '@/hooks/useMessage';
import { Asset } from '@/types/asset';
import { Fund } from '@/types/fund';

interface AssetDetailProps {
  fund: Fund;
  fundKey: string;
  assetKey: string;
}

const AssetContainer = React.memo(
  ({ fund, assetKey, fundKey }: AssetDetailProps) => {
    const assetUrl = `https://api.opensea.io/api/v1/asset/${fund.asset.address}/${assetKey}`;

    // @TODO move to a useAsset hook
    const [{ data, loading, error }, refetch] = useAxios<Asset>({
      url: assetUrl,
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_OPENSEA_API_KEY,
      },
    });

    const retryRef = useRef(0);

    useEffect(() => {
      if (error == null) {
        retryRef.current = 0;
      } else if (retryRef.current <= 2) {
        const h = setTimeout(() => {
          retryRef.current++;
          refetch();
        }, 3000);
        return () => clearTimeout(h);
      }
    }, [error]);

    if (error) {
      return (
        <div className="container text-center mx-auto px-4 py-20 dark:text-gray-50 text-gray-800">
          <p>{useMessage('asset.error')}</p>
        </div>
      );
    }

    return (
      <>
        <Head>
          <title>
            {useMessage('asset.meta.title', {
              asset: data?.name,
              fund: fund.fundToken.name,
            })}
          </title>
          <meta name="description" content={data?.description} />
        </Head>
        <div className="container text-center mx-auto px-4 pt-10 pb-20 dark:text-gray-50 text-gray-800">
          <div className="mt-8 mb-4">
            <Breadcrumb />
          </div>
          <AssetDetail
            status={
              loading ? AssetDetailStatus.PENDING : AssetDetailStatus.DEFAULT
            }
            eyebrow={fund.fundToken.name}
            title={data?.name}
            text={data?.description}
            background={
              data?.background_color ? `#${data.background_color}` : null
            }
            image={data?.image_url}
            assetType={data?.asset_contract?.name}
            openseaUrl={data?.permalink}
            fundName={fund.fundToken.name}
            fundAddress={fund.fundToken.address}
            fundSymbol={fund.fundToken.symbol}
            lastSalePrice={data?.last_sale?.total_price}
            performance={null}
            vaultId={fund.vaultId}
          />
          <section className="mt-24">
            <AssetGroup
              namespace="asset.otherHoldings"
              slug={`/funds/${fundKey}`}
              assetKey={assetKey}
              fund={fund}
            />
          </section>
        </div>
      </>
    );
  }
);

export default AssetContainer;
