import React, { useEffect, useState } from 'react';
import { createContext, ReactChild, useContext } from 'react';
import fetchWithTimeout from '@/utils/fetchWithTimeout';
import { fundSymbols } from '@/constants/allowlist';
import fundMeta from '@/constants/fundData.json';
import { Fund } from '@/types/fund';

const FundsContext = createContext<Fund[]>([]);

const getFunds = async function (): Promise<Omit<Fund, 'meta'>[]> {
  // fetch the latest funds data, cap at 5 seconds
  try {
    const res = await fetchWithTimeout('https://nftx.xyz/funds-data', {
      timeout: 5000,
    });
    if (res.ok) {
      return res.json();
    } else {
      // if response is borked go and fetch the backup
      throw new Error();
    }
  } catch (err) {
    // if we error out or fail
    // fetch the backup funds
    const backup = await fetch('/data/funds.json');
    return backup.json();
  }
};

export const FundsProvider = ({ children }: { children: ReactChild }) => {
  const [funds, setFunds] = useState<Fund[]>([]);
  useEffect(() => {
    (async () => {
      const allFunds = await getFunds();
      const filteredFunds = allFunds.filter(
        (f) => f.isFinalized && fundSymbols.includes(f.fundToken.symbol)
      );
      const withMeta = filteredFunds.map((f) => {
        const meta = fundMeta.find((fm) => fm.vaultId === f.vaultId) || {};
        return {
          ...f,
          meta,
        };
      });

      setFunds(withMeta);
    })();
  }, []);

  return (
    <FundsContext.Provider value={funds}>{children}</FundsContext.Provider>
  );
};

export const useFundsContext = () => {
  return useContext(FundsContext);
};
