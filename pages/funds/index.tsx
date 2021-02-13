import React, { useState } from 'react';
import FilterResults from 'react-filter-search';
import FundGroups from '../../components/FundGroups';
import Search from '../../components/Search';
import { useFundsContext } from '../../contexts/funds';
import { useVaultsContext } from '../../contexts/vaults';

const FundsPage = () => {
  const funds = useFundsContext();
  const vaults = useVaultsContext();
  const [value, setValue] = useState('');

  function handleChange(event: { target: HTMLInputElement }) {
    const { value } = event.target;
    setValue(value);
  }

  return (
    <div className="container mx-auto pt-16 pb-24 px-4">
      <div className="flex items-end justify-end max-w-full my-10">
        <Search value={value} handleChange={handleChange} />
      </div>
      <FilterResults
        value={value}
        data={funds}
        renderResults={(results) => (
          <FundGroups funds={results} vaults={vaults} />
        )}
      />
    </div>
  );
};

export default FundsPage;
