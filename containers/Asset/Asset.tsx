import useAxios from 'axios-hooks';
import Head from 'next/head';
import React, { useEffect } from 'react';
import Breadcrumb from '@/components/Breadcrumbs';
import AssetDetail, { AssetDetailStatus } from '@/components/AssetDetail';
import AssetGroup from '@/components/AssetGroup';
import useMessage from '@/hooks/message';
import { Asset } from '@/types/asset';

interface AssetDetailProps {
  fund: any;
  fundKey: string;
  assetKey: string;
}

const AssetContainer = React.memo(
  ({ fund, assetKey, fundKey }: AssetDetailProps) => {
    const assetUrl = `https://api.opensea.io/api/v1/asset/${fund.asset.address}/${assetKey}`;

    const [{ data, loading, error }, refetch] = useAxios<Asset>({
      url: assetUrl,
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_OPENSEA_API_KEY,
      },
    });

    useEffect(() => {
      let retryCount = 0;
      if (error && retryCount <= 2) {
        setTimeout(() => {
          retryCount++;
          refetch();
        }, 3000);
      }
    }, [error]);

    if (error) {
      return (
        <div className="container text-center mx-auto px-4 py-20 text-gray-50">
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
        <div className="container text-center mx-auto px-4 pt-10 pb-20 text-gray-50">
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
            image={data?.image_original_url}
            assetType={data?.asset_contract?.name}
            openseaUrl={data?.permalink}
            fundName={fund.fundToken?.name}
            lastSalePrice={data?.last_sale?.total_price}
            performance={null}
            vaultId={fund.vaultId}
          />
          <section className="mt-24">
            <AssetGroup
              namespace="otherHoldings"
              fundKey={fundKey}
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
