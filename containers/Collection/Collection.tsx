import React, { useState } from 'react';
import Head from 'next/head';
import useMessage from '@/hooks/useMessage';
import Search from '@/components/Search';
import Breadcrumb from '@/components/Breadcrumbs';
import AssetGroup from '@/components/AssetGroup';
import { getFundKey } from '@/utils/getFundKey';
import { Fund } from '@/types/fund';
import { useVaultsContext } from '@/contexts/vaults';
import FundGroup from '@/components/FundGroup';
import useAxios from 'axios-hooks';
import { Asset } from '@/types/asset';

const CollectionContainer = ({
  funds,
  collection,
}: {
  collection: {
    items: string[];
    image: string;
    namespace: string;
    contract: string;
  };
  funds: Fund[];
}) => {
  const [value, setValue] = useState('');
  const vaults = useVaultsContext();

  const assetUrl = `https://api.opensea.io/api/v1/asset_contract/${collection.contract}`;

  // @TODO move to a useCollection hook
  const [{ data }] = useAxios<Asset>({
    url: assetUrl,
    headers: {
      'X-API-KEY': process.env.NEXT_PUBLIC_OPENSEA_API_KEY,
    },
  });

  function handleChange(event: { target: HTMLInputElement }) {
    const { value } = event.target;
    setValue(value);
  }

  const getSupportingFundData = (fund: Fund) =>
    vaults.reduce((acc, cur) => {
      if (cur.d2VaultId === fund.vaultId) {
        return [
          ...acc,
          ...cur.d1VaultIds.map((d1) => {
            return funds.find((f) => f.vaultId === d1);
          }),
        ];
      }
      return acc;
    }, []);

  const sorted = funds.sort((f) => (f.isD2Vault ? -1 : 1));

  return (
    <>
      <Head>
        <title>
          {useMessage(`collection.meta.title`, {
            collection: data?.collection?.name || data?.name,
          })}
        </title>
      </Head>
      <div className="container mx-auto px-4 text-gray-50">
        <div className="md:flex md:flex-row mb-8">
          <header className="w-full md:w-1/2">
            <div className="mt-16 mb-4">
              <Breadcrumb />
            </div>
            <div className="flex-1 mb-6">
              <h1 className="text-left text-3xl font-bold lg:mb-0 mr-4 uppercase">
                {data?.collection?.name || data?.name}
              </h1>
              <p className="mt-6">{data?.description}</p>
            </div>
          </header>
          <aside className="w-full md:w-1/2 text-right flex flex-col items-end justify-end">
            <Search value={value} handleChange={handleChange} />
          </aside>
        </div>
        {funds ? (
          <section className="my-12">
            {sorted.map((cf) => {
              const key = getFundKey(cf);
              // if it's a D2 we need to grab the inner funds from the vault map
              if (cf.isD2Vault) {
                const supportingFunds = getSupportingFundData(cf);

                return (
                  <div key={cf.fundToken.name} className="mb-24">
                    <FundGroup
                      funds={supportingFunds}
                      slug={key}
                      namespace={`funds.${key}`}
                      fund={cf}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={cf.fundToken.name} className="mb-24">
                    <AssetGroup
                      namespace="funds.collection"
                      fundKey={key}
                      fund={cf}
                      max={10}
                    />
                  </div>
                );
              }
            })}
          </section>
        ) : null}
      </div>
    </>
  );
};

export default CollectionContainer;
