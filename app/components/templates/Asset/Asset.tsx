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
          <meta
            property="og:title"
            content={useMessage('asset.meta.title', {
              asset: data?.name,
              fund: fund.fundToken.name,
            })}
          />
          <meta property="og:description" content={data?.description} />
          <meta
            property="og:image"
            content={`https://res.cloudinary.com/nftx/image/fetch/b_white,w_1600,h_600,f_auto,c_lpad,g_west,x_24/l_v1621440569:nftx-assets:logos:NFTX_logotype_on_white,w_200,g_north_west,x_600,y_180/l_text:Arial_75_bold:${encodeURIComponent(
              fund.fundToken.name
            )},g_north_west,x_600,y_260/l_text:Arial_55_bold:${encodeURIComponent(
              data?.name
            )},g_north_west,x_600,y_320/l_text:Arial_45:%24${encodeURIComponent(
              fund.fundToken.name
            )},g_north_west,x_600,y_390/${data?.image_url}`}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:site_name" content="NFTX NFT Gallery" />
          <meta name="twitter:site" content="@nftx_" />
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
