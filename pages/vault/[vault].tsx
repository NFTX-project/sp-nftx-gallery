import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import vaultsJson from '../../constants/vaults.json';
import useAxios from 'axios-hooks';
import FilterResults from 'react-filter-search';
import Search from '../../components/Search';
import VaultCard from '../../components/VaultCard';

interface VaultsProps {
  vault: string;
}

function VaultCollection({ vault }: VaultsProps) {
  const activeVault = useMemo(() => {
    return (
      vaultsJson.find((v) => {
        if (vault === v.name.toLocaleLowerCase()) {
          return v;
        }
      }) || vaultsJson[0]
    );
  }, [vault]);

  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(0);
  const [collection, setCollection] = useState([]);
  const [value, setValue] = useState('');
  const url = useMemo(() => {
    const tokenIds = activeVault.ids.slice(offset, limit).join('&token_ids=');

    return `https://api.opensea.io/api/v1/assets?asset_contract_address=${activeVault.address}&token_ids=${tokenIds}&offset=${offset}&limit=${limit}`;
  }, [activeVault, offset, limit]);

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-off-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-off-white">
        <p>Error!{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto text-center px-4 text-off-white">
      <header className="flex flex-col sm:flex-row justify-between items-center mt-8 mb-16">
        <h1 className="flex-1 text-left text-3xl font-bold mb-6 sm:mb-0">
          {activeVault.name}
        </h1>
        <Search value={value} handleChange={handleChange} />
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-12">
        {
          <FilterResults
            value={value}
            data={collection}
            renderResults={(results) =>
              results.length === 0
                ? 'None found!'
                : results.map((asset, idx) => (
                    <VaultCard
                      key={idx}
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
                  ))
            }
          />
        }
      </div>
      {/* see more button */}
      {activeVault.ids.length < collection.length && (
        <button onClick={seeMore}>more</button>
      )}
    </div>
  );
}

export default function Vault() {
  const router = useRouter();
  const [vault, setVault] = useState<string>(undefined);

  useEffect(() => {
    if (!router.query.vault) return;
    console.log('VAULT', router.query.vault);
    setVault(router.query.vault.toString());
  }, [router]);

  if (!vault) return <p className="text-gray-100">NO VAULT WITH THAT NAME</p>;

  return (
    <>
      <VaultCollection vault={vault} />
    </>
  );
}
