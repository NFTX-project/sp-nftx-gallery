import { useEffect, useState } from 'react';
import { useFundsContext } from '@/contexts/funds';
import { getFundKey } from '@/utils/getFundKey';

/**
 * Given a fundKey it returns the whole fund
 * @param fundKey the key (getFundKey) or the vault ID of the fund
 *
 * If no fund is found it returns false, this allows for pending states to map
 * to null and failed states to use 'false'
 */
const useFund = (fundKey: string | number) => {
  const [fund, setFund] = useState(null);
  const funds = useFundsContext();

  useEffect(() => {
    if (funds.length) {
      const match = funds.find((v) => {
        // if no match on fund key string, try vaultId
        return fundKey === getFundKey(v) || Number(fundKey) === v.vaultId;
      });

      if (match) {
        setFund(match);
      } else {
        setFund(false);
      }
    }
  }, [fundKey, funds]);

  return fund;
};

export default useFund;
