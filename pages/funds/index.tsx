import Head from 'next/head';
import React, { useState } from 'react';
import FilterResults from 'react-filter-search';
import FundGroups from '@/components/modules/FundGroups';
import Breadcrumb from '@/components/modules/Breadcrumbs';
import Search from '@/components/modules/Search';
import { useFundsContext } from '@/contexts/funds';
import { useVaultsContext } from '@/contexts/vaults';
import useMessage from '@/hooks/useMessage';
import { Fund } from '@/types/fund';

const FundsPage = () => {
  const funds = useFundsContext();
  const vaults = useVaultsContext();
  const [value, setValue] = useState('');

  function handleChange(event: { target: HTMLInputElement }) {
    const { value } = event.target;
    setValue(value);
  }

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
          data={funds}
          renderResults={(results: Fund[]) => (
            <FundGroups funds={results} vaults={vaults} showLink={false} />
          )}
        />
      </div>
    </>
  );
};

export default FundsPage;
