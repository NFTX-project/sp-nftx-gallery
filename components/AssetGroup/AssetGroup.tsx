import React, { useMemo } from 'react';
import Link from 'next/link';
import useAxios from 'axios-hooks';
import useMessage from '@/hooks/message';
import Icon, { Icons } from '@/components/Icon';
import Divider from '@/components/Divider';
import VaultCard from '@/components/VaultCard';
import { Fund } from '@/types/fund';
import { Asset } from '@/types/asset';
import { VaultCardStatus, VaultCardType } from '../VaultCard/constants';

interface AssetGroupProps {
  fund: Fund;
  fundKey: string;
  assetKey?: string;
  namespace: string;
  assets?: Asset[];
  max?: number;
}

const AssetGroup = ({
  fund,
  fundKey,
  assets,
  namespace,
  loading,
  error,
  max,
}: AssetGroupProps & {
  loading: boolean;
  error: Error;
}) => (
  <section className="font-sans font-bold">
    <header className="flex flex-col md:flex-row items-baseline justify-between mb-5">
      <h3 className="text-gray-50 font-sans text-2xl">
        {useMessage(`asset.${namespace}.title`, {
          fund: fund.fundToken.name,
        })}
      </h3>
      <Link href={`/funds/${fundKey}`}>
        <a className="text-gray-50 text-lg font-sans flex items-center">
          {useMessage(`asset.${namespace}.link`)}
          <Icon name={Icons.CHEVRON_RIGHT} />
        </a>
      </Link>
    </header>
    <Divider />
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4`}
    >
      {loading &&
        [...Array(max)].map((el, i) => (
          <VaultCard key={i} status={VaultCardStatus.PENDING} />
        ))}
      {assets && !error
        ? assets?.map((asset) => (
            <Link
              key={asset.token_id}
              href={`/funds/${fundKey}/${asset.token_id}`}
            >
              <a>
                <VaultCard type={VaultCardType.ASSET} asset={asset} />
              </a>
            </Link>
          ))
        : null}
    </div>
  </section>
);

const AssetGroupLoader = ({
  fund,
  assetKey,
  fundKey,
  namespace,
  max = 5,
}: AssetGroupProps) => {
  const randomEntry = useMemo(
    () =>
      Math.floor(
        Math.random() *
          (fund.holdings.length > max ? fund.holdings.length - max : 0)
      ),
    [fund]
  );

  const tokenIds = fund.holdings
    .filter((h) => h !== assetKey)
    .splice(randomEntry, max)
    .join('&token_ids=');
  const assetUrl = `https://api.opensea.io/api/v1/assets?asset_contract_address=${fund.asset.address}&token_ids=${tokenIds}&limit=${max}`;

  // @TODO move to a useAssets hook
  const [{ data, loading, error }] = useAxios<{ assets: Asset[] }>({
    url: assetUrl,
    headers: {
      'X-API-KEY': process.env.NEXT_PUBLIC_OPENSEA_API_KEY,
    },
  });

  return (
    <AssetGroup
      fund={fund}
      assets={data?.assets}
      fundKey={fundKey}
      max={max}
      namespace={namespace}
      loading={loading}
      error={error}
    />
  );
};

export default AssetGroupLoader;
