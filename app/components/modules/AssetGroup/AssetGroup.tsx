import React, { useMemo } from 'react';
import Link from 'next/link';
import Divider from '@/components/elements/Divider';
import VaultCard from '@/components/modules/VaultCard';
import GroupHeader from '@/components/modules/GroupHeader';
import { Fund } from '@/types/fund';
import { Asset } from '@/types/asset';
import { VaultCardStatus, VaultCardType } from '../VaultCard/constants';
import useAssets from '@/hooks/useAssets';

interface AssetGroupProps {
  fund: Fund;
  slug: string;
  assetKey?: string;
  namespace: string;
  assets?: Asset[];
  max?: number;
}

const AssetGroup = ({
  fund,
  slug,
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
    <GroupHeader fund={fund} namespace={namespace} slug={slug} />
    <Divider />
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4`}
    >
      {loading &&
        [...Array(max)].map((el, i) => (
          <VaultCard key={i} status={VaultCardStatus.PENDING} />
        ))}
      {assets && !error
        ? assets?.map((asset) => (
            <Link key={asset.token_id} href={`${slug}/${asset.token_id}`}>
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
  slug,
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
      slug={slug}
      max={max}
      namespace={namespace}
      loading={loading}
      error={error}
    />
  );
};

export default AssetGroupLoader;
