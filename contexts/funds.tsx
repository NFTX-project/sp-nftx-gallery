import React /* useEffect, useState */ from 'react';
import { createContext, ReactChild, useContext } from 'react';
import fundsData from '../data/funds.json';

const FundsContext = createContext([]);

// const getFunds = async function () {
//   try {
//     // fetch the latest funds data
//     // const res = await fetch('https://nftx.xyz/funds-data');
//   } catch (err) {
//     // if we error out or fail
//     console.error(err);
//     return [];
//   }
// };

export const FundsProvider = ({ children }: { children: ReactChild }) => {
  // const [funds, setFunds] = useState([]);
  // useEffect(() => {
  //   (async () => {
  //     setFunds(await getFunds());
  //   })();
  // }, []);

  return (
    <FundsContext.Provider value={fundsData}>{children}</FundsContext.Provider>
  );
};

export const useFundsContext = () => {
  return useContext(FundsContext);
};
