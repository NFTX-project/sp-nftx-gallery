import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FormattedMessage, useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import FilterResults from 'react-filter-search';
import Breadcrumb from '@/components/modules/Breadcrumbs';
import Button, { Kind, Size } from '@/components/elements/Button';
import Divider from '@/components/elements/Divider';
import FundStatus from '@/components/modules/FundStatus';
import { Icons } from '@/components/elements/Icon';
import Search from '@/components/modules/Search';
import Tvl from '@/components/elements/Tvl';
import VaultCard, {
  VaultCardStatus,
  VaultCardType,
} from '@/components/modules/VaultCard';
import useMessage from '@/hooks/useMessage';
import type { FundProps } from './types';
import { Asset } from '@/types/asset';
import usePrice from '@/hooks/usePrice';
import useAssets from '@/hooks/useAssets';

const SingleFund = ({
  holdings,
  asset,
  fundToken,
  isFinalized,
  vaultId,
  fundKey,
  meta,
}: FundProps) => {
  const { asPath } = useRouter();
  const intl = useIntl();
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);
  const [collection, setCollection] = useState([]);
  const [value, setValue] = useState('');
  const price = usePrice(fundToken.address);

  const { assets, loading } = useAssets(
    asset.address,
    holdings.slice(offset, limit),
    limit
  );

  useEffect(() => {
    if (!assets) return;
    setCollection([...collection, ...assets]);
  }, [assets]);

  const handleChange = (event: { target: HTMLInputElement }) => {
    const { value } = event.target;
    setValue(value);
  };

  const seeMore = () => {
    setOffset(limit);
    setLimit((limit) => limit + 25);
  };

  // Check for specific fund text or pull from asset
  const message =
    intl.messages[`fund.single.${fundKey}.text`] ??
    assets?.[0].asset_contract?.description;

  return (
    <>
      <Head>
        <title>
          {useMessage(`fund.meta.title`, {
            fund: fundToken.name,
          })}
        </title>
      </Head>
      <div className="container mx-auto px-4 dark:text-gray-50 text-gray-800 mt-16">
        <div className="flex flex-col md:flex-row mb-8">
          <header className="flex-1 md:pr-8">
            <div className="mb-4">
              <Breadcrumb />
            </div>
            <div className="flex-1 flex flex-col lg:flex-row lg:flex-wrap items-baseline mb-6">
              <h1 className="text-left text-3xl font-bold mb-6 lg:mb-0 mr-4 uppercase">
                {fundToken.name}
              </h1>
              <FundStatus amm={true} ver={true} fin={isFinalized} />
            </div>
            <div className="mb-6 max-w-prose">
              <p>{message}</p>
            </div>
            <dl className="flex flex-wrap items-center">
              <div className="mr-4 mb-2 sm:mb-0 flex-none">
                <img
                  src={`/images/icons/icon-vault-${vaultId}-40.png`}
                  alt={`${fundToken.name} icon`}
                  className="sm:h-10 sm:w-10"
                />
              </div>
              <div className="flex mb-2 sm:mb-0">
                <div className="mr-4 flex flex-col text-left">
                  <dt>{useMessage('fund.detail.supply')}</dt>
                  <dd className="font-bold text-xl">{holdings.length}</dd>
                </div>
                {!!price.usd && (
                  <>
                    <div className="mr-4 flex-col text-left">
                      <dt>
                        <FormattedMessage id="fund.detail.price" />
                      </dt>
                      <dd className="font-bold text-xl">{price.usd}</dd>
                    </div>
                    <div className="mr-4 flex-col text-left">
                      <dt>
                        <FormattedMessage id="fund.detail.tvl" />
                      </dt>
                      <dd className="font-bold text-xl">
                        <Tvl price={price.raw} quantity={holdings.length} />
                      </dd>
                    </div>
                  </>
                )}
              </div>
            </dl>
          </header>
          <aside className="text-right flex flex-col justify-end items-end">
            <div className="mt-2 sm:mt-4 mb-4 w-full md:w-auto">
              <Button
                className="mb-4 w-full md:w-auto"
                size={Size.SMALL}
                kind={Kind.SECONDARY}
                href={
                  meta.buyUrl ||
                  `https://app.sushi.com/add/ETH/${fundToken.address}`
                }
                target="_blank"
                icon={Icons.EXTERNAL_LINK}
              >
                {useMessage(
                  meta.buyUrl
                    ? meta.buyUrl.includes('sushi')
                      ? 'fund.cta.sushi'
                      : 'fund.cta.invest'
                    : 'fund.cta.liquidity',
                  {
                    fund: <span className="uppercase">{fundToken.symbol}</span>,
                  }
                )}
              </Button>
              <div />
              <Button
                className="w-full md:w-auto"
                kind={Kind.PRIMARY}
                href={`https://app.nftx.org/mint/${vaultId}`}
                target="_blank"
                icon={Icons.EXTERNAL_LINK}
              >
                {useMessage('fund.cta.mint', {
                  token: <span className="uppercase">{fundToken.symbol}</span>,
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
          <div className="my-8 text-center">
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
