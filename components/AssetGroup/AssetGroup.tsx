import React, { useMemo } from 'react';
import Link from 'next/link';
import useAxios from 'axios-hooks';
import useMessage from '@/hooks/message';
import Icon, { Icons } from '@/components/Icon';
import Divider from '@/components/Divider';
import VaultCard from '@/components/VaultCard';
import { Fund } from '@/types/fund';
import { Asset } from '@/types/asset';

interface AssetGroupProps {
  fund: Fund;
  fundKey: string;
  assetKey: string;
}

const AssetGroup = React.memo(
  ({ fund, fundKey, assetKey }: AssetGroupProps) => {
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

    const [{ data, loading, error }] = useAxios<{ assets: Asset[] }>({
      url: assetUrl,
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_OPENSEA_API_KEY,
      },
    });

    if (loading || error) {
      return null;
    }

    if (!data?.assets?.length) {
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

export default AssetGroup;
