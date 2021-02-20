import { Asset } from '@/types/asset';
import useAxios from 'axios-hooks';
import { useEffect, useRef } from 'react';

const useAssets = (address: string, tokens: string[], max: number) => {
  const retryRef = useRef(0);
  const tokenIds = tokens.join('&token_ids=');
  const assetUrl = `https://api.opensea.io/api/v1/assets?asset_contract_address=${address}&token_ids=${tokenIds}&limit=${max}`;

  const [{ data, loading, error }, refetch] = useAxios<{ assets: Asset[] }>({
    url: assetUrl,
    headers: {
      'X-API-KEY': process.env.NEXT_PUBLIC_OPENSEA_API_KEY,
    },
  });

  useEffect(() => {
    // if we have tokens but request failed, retry 3 times
    if (tokenIds.length) {
      if (error == null) {
        retryRef.current = 0;
      } else if (retryRef.current <= 2) {
        const h = setTimeout(() => {
          retryRef.current++;
          refetch();
        }, 3000);
        return () => clearTimeout(h);
      }
    }
  }, [error]);

  return {
    loading,
    error,
    assets: data?.assets,
  };
};

export default useAssets;
