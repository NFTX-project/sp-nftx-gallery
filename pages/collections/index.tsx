import Head from 'next/head';
import React, { useMemo, useState } from 'react';
import FilterResults from 'react-filter-search';
import FundGroups from '@/components/FundGroups';
import Search from '@/components/Search';
import { useFundsContext } from '@/contexts/funds';
import { useVaultsContext } from '@/contexts/vaults';
import useMessage from '@/hooks/useMessage';
import collections from '@/constants/collections';
import { Fund } from '@/types/fund';
import { getCategoryKey } from '@/utils/getCategoryKey';
import Breadcrumb from '@/components/Breadcrumbs';

const CollectionsPage = () => {
  const funds = useFundsContext();
  const vaults = useVaultsContext();
  const [value, setValue] = useState('');

  function handleChange(event: { target: HTMLInputElement }) {
    const { value } = event.target;
    setValue(value);
  }

  // loop the funds and include any in the collections array
  const collectionFunds = useMemo(() => {
    if (funds) {
      return funds.filter((f) => {
        if (collections.find((c) => c.items.includes(getCategoryKey(f)))) {
          return true;
        }
        return false;
      });
    }
    return [];
  }, [funds]);

  return (
    <>
      <Head>
        <title>{useMessage('funds.meta.title')}</title>
      </Head>
      <div className="container mx-auto pt-16 pb-18 px-4">
        <Breadcrumb />
        <div className="flex items-end justify-end max-w-full my-10">
          <Search value={value} handleChange={handleChange} />
        </div>
        <FilterResults
          value={value}
          data={collectionFunds}
          renderResults={(results: Fund[]) => (
            <FundGroups funds={results} vaults={vaults} showLink={false} />
          )}
        />
      </div>
    </>
  );
};

export default CollectionsPage;
