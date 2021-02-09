import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import funds from '../../constants/funds.json';
import useAxios from 'axios-hooks';
import FilterResults from 'react-filter-search';
import Search from '../../components/Search';
import VaultCard from '../../components/VaultCard';
import { VaultCardStatus } from '../../components/VaultCard/constants';
import Button, { Kind } from '../../components/Button';

interface FundProps {
  fund: string;
}

function FundCollection({ fund }: FundProps) {
  const activeFund = useMemo(() => {
    return (
      funds.find((v) => {
        if (fund === v.fundToken.name.toLocaleLowerCase()) {
          return v;
        }
      }) || funds[0]
    );
  }, [fund]);

  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(0);
  const [collection, setCollection] = useState([]);
  const [value, setValue] = useState('');
  const url = useMemo(() => {
    const tokenIds = activeFund.holdings
      .slice(offset, limit)
      .join('&token_ids=');

    return `https://api.opensea.io/api/v1/assets?asset_contract_address=${activeFund.asset.address}&token_ids=${tokenIds}&offset=${offset}&limit=${limit}`;
  }, [activeFund, offset, limit]);

  const [{ data, loading, error }, refetch] = useAxios(url);

  useEffect(() => {
    if (offset === 0) return;
    refetch();
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
    setLimit((limit) => limit + 50);
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-gray-50">
        <p>Error!{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto text-center px-4 text-gray-50">
      <header className="flex flex-col sm:flex-row justify-between items-center mt-8 mb-16">
        <h1 className="flex-1 text-left text-3xl font-bold mb-6 sm:mb-0">
          {activeFund.fundToken.name}
        </h1>
        <Search value={value} handleChange={handleChange} />
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-12">
        {loading ? (
          [...Array(4)].map((el, i) => (
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

              return toMap.map((asset, idx) => (
                <VaultCard
                  key={idx}
                  eyebrow={asset.asset_contract.name}
                  image={asset.image_url}
                  title={asset.name}
                  background={
                    asset.background_color ? `#${asset.background_color}` : null
                  } // seems to come through as hex without the hex
                  text={`Number of sales: ${asset.num_sales || 0}`}
                />
              ));
            }}
          />
        )}
      </div>
      {/* see more button */}
      {activeFund.holdings.length < collection.length && (
        <Button kind={Kind.SECONDARY} onClick={seeMore}>
          {'More'}
        </Button>
      )}
    </div>
  );
}

export default function Vault() {
  const router = useRouter();
  const [fund, setFund] = useState<string>(undefined);

  useEffect(() => {
    if (!router.query.fund) return;
    setFund(router.query.fund.toString());
  }, [router]);

  if (!fund)
    return <p className="text-gray-100">{'NO VAULT WITH THAT NAME'}</p>;

  return <FundCollection fund={fund} />;
}
