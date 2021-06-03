import React, { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Search from '@/components/modules/Search';
import Breadcrumb from '@/components/modules/Breadcrumbs';
import AssetGroup from '@/components/modules/AssetGroup';
import FundGroup from '@/components/modules/FundGroup';
import { getFundKey } from '@/utils/getFundKey';
import { Fund } from '@/types/fund';
import { useVaultsContext } from '@/contexts/vaults';
import { Collection } from '@/types/wp';

const CollectionContainer = ({
  funds,
  collection,
}: {
  collection: Collection;
  funds: Fund[] | false;
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
          ...cur.d1VaultIds
            .map((d1) => {
              if (funds) {
                return funds.find((f) => f.vaultId === d1);
              }
            })
            .filter(Boolean),
        ];
      }
      return acc;
    }, []);

  const sorted = useMemo(() => {
    if (funds) {
      return funds.sort((f) => (f.isD2Vault ? -1 : 1));
    }
  }, [funds]);

  return (
    <>
      <div className="container mx-auto px-4 dark:text-gray-50 text-gray-800">
        <div className="md:flex md:flex-row mb-8">
          <header className="w-full md:w-1/2">
            <div className="mt-16 mb-4">
              <Breadcrumb />
            </div>
            <div className="flex-1 mb-6">
              <h1 className="text-left text-3xl font-bold lg:mb-0 mr-4 uppercase">
                {collection.acf.collection_title}
              </h1>
              <div
                className="mt-6"
                dangerouslySetInnerHTML={{
                  __html: collection.acf.collection_description,
                }}
              />
            </div>
          </header>
          <aside className="w-full md:w-1/2 text-right flex flex-col items-end justify-end">
            <Search value={value} handleChange={handleChange} />
          </aside>
        </div>
        {funds === false && (
          <div className="container text-center mx-auto px-4 py-20 dark:text-gray-50 text-gray-800">
            <p>
              <FormattedMessage id="collection.notfound" />
            </p>
          </div>
        )}
        {funds == null && (
          <div className="container text-center mx-auto px-4 py-20 dark:text-gray-50 text-gray-800">
            <p>
              <FormattedMessage id="collection.loading" />
            </p>
          </div>
        )}
        {funds !== false && funds != null && (
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
                      slug={`/funds/${key}`}
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
                      slug={`/funds/${key}`}
                      fund={cf}
                      max={10}
                    />
                  </div>
                );
              }
            })}
          </section>
        )}
      </div>
    </>
  );
};

export default CollectionContainer;
