import useAxios from 'axios-hooks';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs';
import AssetDetail, {
  AssetDetailStatus,
} from '../../../components/AssetDetail';
import useFund from '../../../hooks/fund';
import useMessage from '../../../hooks/message';
import Link from 'next/link';
import Icon, { Icons } from '../../../components/Icon';
import Divider from '../../../components/Divider';
import VaultCard from '../../../components/VaultCard';
// import { getCategoryKey } from '../../../utils/getCategoryKey';

interface AssetDetailProps {
  fund: any;
  fundKey: string;
  assetKey: string;
}

const OtherAssets = React.memo(
  ({
    fund,
    fundKey,
    assetKey,
  }: {
    fund: any;
    fundKey: string;
    assetKey: string;
  }) => {
    const randomEntry = useMemo(
      () =>
        Math.floor(
          Math.random() *
            (fund.holdings.length > 5 ? fund.holdings.length - 5 : 0)
        ),
      [fund]
    );

    const tokenIds = fund.holdings
      .filter((h) => h !== assetKey)
      .splice(randomEntry, 5)
      .join('&token_ids=');
    const assetUrl = `https://api.opensea.io/api/v1/assets?asset_contract_address=${fund.asset.address}&token_ids=${tokenIds}&limit=5`;

    const [{ data = {}, loading, error }] = useAxios(assetUrl);

    if (loading || error) {
      return null;
    }

    return (
      <section className="font-sans font-bold">
        <header className="flex flex-col md:flex-row items-baseline justify-between mb-5">
          <h3 className="text-gray-50 font-sans text-2xl">
            {useMessage(`asset.otherHoldings.title`)}
          </h3>
          <Link href={`/funds/${fundKey}`}>
            <a className="text-gray-50 text-lg font-sans flex items-center">
              {useMessage(`asset.otherHoldings.link`)}
              <Icon name={Icons.CHEVRON_RIGHT} />
            </a>
          </Link>
        </header>
        <Divider />
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4`}
        >
          {data.assets.map((asset) => (
            <Link
              key={asset.token_id}
              href={`/funds/${fundKey}/${asset.token_id}`}
            >
              <a>
                <VaultCard
                  image={asset.image_thumbnail_url}
                  eyebrow={asset.asset_contract.name}
                  title={asset.name}
                  stack={false}
                />
              </a>
            </Link>
          ))}
        </div>
      </section>
    );
  }
);

OtherAssets.displayName = 'OtherAssets';

const AssetView = React.memo(
  ({ fund, assetKey, fundKey }: AssetDetailProps) => {
    // const category = getCategoryKey(fund);
    const assetUrl = `https://api.opensea.io/api/v1/asset/${fund.asset.address}/${assetKey}`;

    const [{ data = {}, loading, error }, refetch] = useAxios(assetUrl);

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
          {/* @TODO when we have individual asset pages, ensure they all canonical to the same root */}
          {/* <link rel="canonical" href={`https://gallery.nftx.org/${category}/${assetKey}`}/> */}
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
            title={data.name}
            text={data.description}
            background={
              data.background_color ? `#${data.background_color}` : null
            }
            image={data.image_original_url}
            assetType={data.asset_contract?.name}
            fundName={fund.fundToken?.name}
            lastSalePrice={data?.last_sale?.total_price}
            performance={Infinity}
            vaultId={fund.vaultId}
          />
          <section className="mt-24">
            <OtherAssets fundKey={fundKey} assetKey={assetKey} fund={fund} />
          </section>
        </div>
      </>
    );
  }
);

AssetView.displayName = 'AssetView';

const AssetPage = () => {
  const { query } = useRouter();
  const fund = useFund(query.fund as string);

  if (fund === false) {
    return (
      <div className="container text-center mx-auto px-4 py-20 text-gray-50">
        <p>{useMessage('fund.notfound')}</p>
      </div>
    );
  }

  if (fund == null) {
    return (
      <div className="container text-center mx-auto px-4 py-20 text-gray-50">
        <p>{useMessage('fund.loading')}</p>
      </div>
    );
  }

  return (
    <AssetView
      assetKey={query.asset as string}
      fundKey={query.fund as string}
      fund={fund}
    />
  );
};

export default AssetPage;
