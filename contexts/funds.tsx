import React, { useEffect, useState } from 'react';
import { createContext, ReactChild, useContext } from 'react';

const FundsContext = createContext([]);

const getFunds = async function () {
  // fetch the latest funds data
  try {
    const res = await fetch('https://nftx.xyz/funds-data');
    if (res.ok) {
      return res.json();
    } else {
      // if response is borked
      // fetch the backup funds
      const backup = await fetch('/data/funds.json');
      return backup.json();
    }
  } catch (err) {
    console.error(err);
    // if we error out or fail
    // fetch the backup funds
    const backup = await fetch('/data/funds.json');
    return backup.json();
  }
};

export const FundsProvider = ({ children }: { children: ReactChild }) => {
  const [funds, setFunds] = useState([]);
  useEffect(() => {
    (async () => {
      setFunds(await getFunds());
    })();
  }, []);

  return (
    <FundsContext.Provider value={funds}>{children}</FundsContext.Provider>
  );
};

export const useFundsContext = () => {
  return useContext(FundsContext);
};
