import React, { useState } from 'react';
import Head from 'next/head';
import useMessage from '@/hooks/message';
import Search from '@/components/Search';
import Breadcrumb from '@/components/Breadcrumbs';
import AssetGroup from '@/components/AssetGroup';
import { getFundKey } from '@/utils/getFundKey';
import { Fund } from '@/types/fund';
import { useVaultsContext } from '@/contexts/vaults';
import FundGroup from '@/components/FundGroup';

const CollectionContainer = ({
  funds,
  collection,
}: {
  collection: {
    items: string[];
    image: string;
    namespace: string;
  };
  funds: Fund[];
}) => {
  const [value, setValue] = useState('');
  const vaults = useVaultsContext();

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
          {useMessage(`collection.${collection.namespace}.meta.title`)}
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
                {useMessage(`collection.${collection.namespace}.title`)}
              </h1>
              <p className="mt-6">
                {useMessage(`collection.${collection.namespace}.text`)}
              </p>
            </div>
          </header>
          <aside className="w-full md:w-1/2 text-right flex flex-col items-end justify-end">
            <Search value={value} handleChange={handleChange} />
          </aside>
        </div>
        {funds ? (
          <section className="my-12">
            {sorted.map((cf) => {
              // if it's a D2 we need to grab the inner funds from the vault map
              if (cf.isD2Vault) {
                const supportingFunds = getSupportingFundData(cf);
                return (
                  <div key={cf.fundToken.name} className="mb-24">
                    <FundGroup
                      funds={supportingFunds}
                      namespace={cf.fundToken.name.toLocaleLowerCase()}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={cf.fundToken.name} className="mb-24">
                    <AssetGroup
                      namespace="collection"
                      fundKey={getFundKey(cf)}
                      fund={cf}
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
