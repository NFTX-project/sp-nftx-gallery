import React /* useEffect, useState */ from 'react';
import { createContext, ReactChild, useContext } from 'react';
import vaultsData from '../data/vaults.json';

const VaultsContext = createContext(vaultsData);

// const getVaults = async function () {
//   try {
//     // fetch the latest vaults data
//     // const res = await fetch('https://nftx.xyz/vaults-data');
//   } catch (err) {
//     // if we error out or fail
//     console.error(err);
//     return [];
//   }
// };

export const VaultsProvider = ({ children }: { children: ReactChild }) => {
  // const [vaults, setVaults] = useState([]);
  // useEffect(() => {
  //   (async () => {
  //     setVaults(await getVaults());
  //   })();
  // }, []);

  return (
    <VaultsContext.Provider value={vaultsData}>
      {children}
    </VaultsContext.Provider>
  );
};

export const useVaultsContext = () => {
  return useContext(VaultsContext);
};
