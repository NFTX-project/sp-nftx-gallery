import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';
import FilterResults from 'react-filter-search';
import Search from '../../components/Search';
import VaultCard from '../../components/VaultCard';
import { VaultCardStatus } from '../../components/VaultCard/constants';
import Button, { Kind } from '../../components/Button';
import FundStatus from '../../components/FundStatus';
import { useFundsContext } from '../../contexts/funds';
import useMessage from '../../hooks/message';
import Breadcrumbs from '../../components/Breadcrumbs';
import Link from 'next/link';

interface FundProps {
  holdings: number[];
  asset: any;
  fundToken: any;
  isFinalized: boolean;
}

const FundCollection = ({
  holdings,
  asset,
  fundToken,
  isFinalized,
}: FundProps) => {
  const { asPath } = useRouter();
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);
  const [collection, setCollection] = useState([]);
  const [value, setValue] = useState('');
  const url = useMemo(() => {
    const tokenIds = holdings.slice(offset, limit).join('&token_ids=');

    return `https://api.opensea.io/api/v1/assets?asset_contract_address=${asset.address}&token_ids=${tokenIds}&limit=25`;
  }, [asset.address, offset, limit]);

  const [{ data, loading, error }, refetch] = useAxios(url);

  const firstItem = collection[0];
  const description =
    firstItem && firstItem.collection ? firstItem.collection.description : '';

  useEffect(() => {
    if (offset === 0) return;

    refetch({ url });
  }, [limit]);

  useEffect(() => {
    if (!data?.assets) return;
    setCollection([...collection, ...data.assets]);
  }, [data]);

  function handleChange(event: { target: HTMLInputElement }) {
    const { value } = event.target;
    setValue(value);
  }

  function seeMore() {
    setOffset(limit);
    setLimit((limit) => limit + 25);
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-gray-25">
        <p>Error! {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto text-center px-4 text-gray-50">
      <div className="mt-16 mb-4">
        <Breadcrumbs />
      </div>
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="flex-1 flex flex-col items-baseline">
          <div className="flex-1 flex items-baseline">
            <h1 className="text-left text-3xl font-bold mb-6 sm:mb-0 mr-4">
              {fundToken.name}
            </h1>
            <FundStatus amm={true} ver={true} fin={isFinalized} />
          </div>
          <p className="text-md pt-4 pr-4 text-left text-white text-opacity-50 leading-relaxed">
            {description}
          </p>
        </div>
        <Search value={value} handleChange={handleChange} />
      </header>
      <div className="bg-gradient-to-r from-yellow-500 via-green-500 to-purple-500 h-0.5 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-12">
        {loading ? (
          [...Array(collection.length)].map((el, i) => (
            <VaultCard key={i} status={VaultCardStatus.PENDING} />
          ))
        ) : (
          <FilterResults
            value={value}
            data={collection}
            renderResults={(results) => {
              let toMap = results;

              if (results.length === 0) {
                toMap = collection;
              }

              return toMap.map((asset) => (
                <Link
                  key={asset.name}
                  href={`${asPath}${encodeURI(asset.token_id)}`}
                >
                  <a>
                    <VaultCard
                      eyebrow={asset.asset_contract.name}
                      image={asset.image_url}
                      title={asset.name}
                      background={
                        asset.background_color
                          ? `#${asset.background_color}`
                          : null
                      } // seems to come through as hex without the hex
                      text={`Number of sales: ${asset.num_sales || 0}`}
                    />
                  </a>
                </Link>
              ));
            }}
          />
        )}
      </div>
      {/* see more button */}
      {holdings.length >= collection.length && (
        <div className="my-8">
          <Button kind={Kind.SECONDARY} onClick={seeMore}>
            {'See More'}
          </Button>
        </div>
      )}
    </div>
  );
};

const FundPage = () => {
  const funds = useFundsContext();
  const router = useRouter();
  const [fund, setFund] = useState<FundProps>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (funds.length) {
      const fundName = router.query.fund;
      const match = funds.find(
        (v) => fundName === v.fundToken.name.toLocaleLowerCase()
      );

      setFund(match);
      setLoading(false);
    }
  }, [funds, router.query.fund]);

  if (!fund && !loading) {
    return (
      <div className="container text-center mx-auto px-4 py-20 text-gray-50">
        <p>{useMessage('fund.notfound')}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container text-center mx-auto px-4 py-20 text-gray-50">
        <p>{useMessage('fund.loading')}</p>
      </div>
    );
  }

  return <FundCollection {...fund} />;
};

export default FundPage;
