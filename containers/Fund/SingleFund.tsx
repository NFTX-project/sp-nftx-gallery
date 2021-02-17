import React, { useEffect, useMemo, useState } from 'react';
import useAxios from 'axios-hooks';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FilterResults from 'react-filter-search';
import Breadcrumb from '@/components/Breadcrumbs';
import Button, { Kind } from '@/components/Button';
import Divider from '@/components/Divider';
import FundStatus from '@/components/FundStatus';
import { Icons } from '@/components/Icon';
import Search from '@/components/Search';
import VaultCard from '@/components/VaultCard';
import {
  VaultCardStatus,
  VaultCardType,
} from '@/components/VaultCard/constants';
import useMessage from '@/hooks/message';
import type { FundProps } from './types';
import { Asset } from '@/types/asset';

const SingleFund = ({
  holdings,
  asset,
  fundToken,
  isFinalized,
  vaultId,
  fundKey,
}: FundProps) => {
  const { asPath } = useRouter();
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);
  const [collection, setCollection] = useState([]);
  const [value, setValue] = useState('');
  const url = useMemo(() => {
    const tokenIds = holdings.slice(offset, limit).join('&token_ids=');
    if (tokenIds) {
      return `https://api.opensea.io/api/v1/assets?asset_contract_address=${asset.address}&token_ids=${tokenIds}&limit=25`;
    }
  }, [asset.address, offset, limit]);

  const [{ data, loading, error }, refetch] = useAxios<{ assets: Asset[] }>({
    url,
    headers: {
      'X-API-KEY': process.env.NEXT_PUBLIC_OPENSEA_API_KEY,
    },
  });

  useEffect(() => {
    if (offset === 0) return;

    refetch({ url });
  }, [limit]);

  useEffect(() => {
    if (!data?.assets) return;
    setCollection([...collection, ...data.assets]);
  }, [data]);

  const handleChange = (event: { target: HTMLInputElement }) => {
    const { value } = event.target;
    setValue(value);
  };

  const seeMore = () => {
    setOffset(limit);
    setLimit((limit) => limit + 25);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-gray-50">
        <p>Error! {error}</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {useMessage(`fund.meta.title`, {
            fund: fundToken.name,
          })}
        </title>
      </Head>
      <div className="container mx-auto text-center px-4 text-gray-50">
        <div className="flex flex-col md:flex-row mb-8">
          <header className="flex-1">
            <div className="mt-16 mb-4">
              <Breadcrumb />
            </div>
            <div className="flex-1 flex flex-col lg:flex-row items-baseline mb-6">
              <h1 className="text-left text-3xl font-bold mb-6 lg:mb-0 mr-4 uppercase">
                {fundToken.name}
              </h1>
              <FundStatus amm={true} ver={true} fin={isFinalized} />
            </div>
            <dl className="flex items-center">
              <div className="mr-4">
                <img
                  src={`/images/icons/icon-${fundKey}-40.png`}
                  alt={`${fundToken.name} icon`}
                  className="h-10 w-10"
                />
              </div>
              <div className="flex flex-col text-left">
                <dt>{useMessage('fund.detail.supply')}</dt>
                <dd className="font-bold text-xl">{holdings.length}</dd>
              </div>
            </dl>
          </header>
          <aside className="text-right flex flex-col justify-end">
            <div className="mb-4">
              <Button
                href={`https://nftx.org/#/fund/${vaultId}`}
                icon={Icons.EXTERNAL_LINK}
                target="_blank"
              >
                {useMessage('fund.cta.invest', {
                  token: fundToken.symbol,
                })}
              </Button>
            </div>
            <Search value={value} handleChange={handleChange} />
          </aside>
        </div>
        <Divider />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-12">
          {loading ? (
            [...Array(collection.length || holdings.length)].map((el, i) => (
              <VaultCard key={i} status={VaultCardStatus.PENDING} />
            ))
          ) : (
            <FilterResults
              value={value}
              data={collection}
              renderResults={(results: Asset[]) =>
                results.map((asset) => {
                  return (
                    <Link
                      key={asset.token_id}
                      href={`${asPath}${encodeURI(asset.token_id)}`}
                    >
                      <a className="flex flex-col">
                        <VaultCard
                          className="flex-1 flex flex-col"
                          type={VaultCardType.ASSET}
                          asset={asset}
                        />
                      </a>
                    </Link>
                  );
                })
              }
            />
          )}
        </div>
        {/* see more button */}
        {holdings.length > collection.length && (
          <div className="my-8">
            <Button kind={Kind.SECONDARY} onClick={seeMore}>
              {useMessage('fund.holdings.seeMore', {
                asset: asset.name,
              })}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleFund;
