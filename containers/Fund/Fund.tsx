import React from 'react';
import CombinedFund from './CombinedFund';
import SingleFund from './SingleFund';
import { FundProps } from './types';

interface FundContainerProps extends FundProps {
  fundKey: string;
}

const FundContainer = ({ fundKey, ...fund }: FundContainerProps) => {
  if (fund.isD2Vault) {
    return <CombinedFund fundKey={fundKey} {...fund} />;
  }

  return <SingleFund fundKey={fundKey} {...fund} />;
};

export default FundContainer;
