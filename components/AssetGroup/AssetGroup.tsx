import React, { useMemo } from 'react';
import Link from 'next/link';
import useMessage from '@/hooks/useMessage';
import Icon, { Icons } from '@/components/Icon';
import Divider from '@/components/Divider';
import VaultCard from '@/components/VaultCard';
import { Fund } from '@/types/fund';
import { Asset } from '@/types/asset';
import { VaultCardStatus, VaultCardType } from '../VaultCard/constants';
import useAssets from '@/hooks/useAssets';

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
    .splice(randomEntry, max);

  const { assets, loading, error } = useAssets(
    fund.asset.address,
    tokenIds,
    max
  );

  return (
    <AssetGroup
      fund={fund}
      assets={assets}
      fundKey={fundKey}
      max={max}
      namespace={namespace}
      loading={loading}
      error={error}
    />
  );
};

export default AssetGroupLoader;
