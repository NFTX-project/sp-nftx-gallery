import { useEffect, useState } from 'react';
import { useFundsContext } from '@/contexts/funds';
import { getFundKey } from '@/utils/getFundKey';

/**
 * Given a fundKey it returns the whole fund
 * @param fundKey the key (getFundKey) of the fund
 *
 * If not fund is found it returns false, this allows for pending states to map
 * to null and failed states to use 'false'
 */
const useFund = (fundKey: string) => {
  const [fund, setFund] = useState(null);
  const funds = useFundsContext();

  useEffect(() => {
    if (funds.length) {
      const match = funds.find((v) => {
        return fundKey === getFundKey(v);
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
