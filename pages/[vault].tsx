import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import vaultsJson from '../constants/vaults.json';
import useAxios from 'axios-hooks';
import FilterResults from 'react-filter-search';
import Search from '../components/Search';

type Asset = {
  name: string;
  image_url: string;
};

interface VaultItemProps {
  asset: Asset;
}

interface VaultsProps {
  vault: string;
}

function VaultItem({ asset }: VaultItemProps) {
  return (
    <div className="each mb-10 shadow-lg border-gray-800 bg-gray-100 relative">
      <img className="w-full" src={asset.image_url} alt="" />
      <div className="desc p-4 text-gray-800">
        <span className="description text-sm block py-2 border-gray-400 mb-2">
          {asset.name}
        </span>
      </div>
    </div>
  );
}

function VaultCollection({ vault }: VaultsProps) {
  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(0);
  const [collection, setCollection] = useState([]);
  const [url, setUrl] = useState(
    `https://api.opensea.io/api/v1/assets?asset_contract_address=${
      vaultsJson[vault].address
    }&token_ids=${vaultsJson[vault].ids
      .slice(offset, limit)
      .join('&token_ids=')}&offset=${offset}&limit=${limit}`
  );
  const [{ data, loading, error }, refetch] = useAxios(url);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (offset === 0) return;
    console.log('LIMIT', limit, 'OFFSET', offset);
    refetch();
  }, [limit]);

  useEffect(() => {
    if (!data?.assets) return;
    console.log(data.assets);
    setCollection([...collection, ...data.assets]);
  }, [data]);

  useEffect(() => {
    console.log(collection);
  }, [collection]);

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
      <div className="container mx-auto px-4 py-20">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20">
        <p className="text-red-400">Error!{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto text-center px-4">
      <header className="flex flex-col sm:flex-row justify-between items-center my-8">
        <h1 className="text-3xl font-bold mb-6 sm:mb-0">
          {vaultsJson[vault].name}
        </h1>
        <Search value={value} handleChange={handleChange} />
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {
          <FilterResults
            value={value}
            data={collection}
            renderResults={(results) =>
              results.length === 0
                ? 'None found!'
                : results.map((asset, idx) => (
                    <VaultItem asset={asset} key={idx} />
                  ))
            }
          />
        }
      </div>
      {/* see more button */}
      {vaultsJson[vault].ids < collection.length && (
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

  if (!vault) return <p>NO VAULT WITH THAT NUMBER</p>;

  return (
    <>
      <VaultCollection vault={vault} />
    </>
  );
}
