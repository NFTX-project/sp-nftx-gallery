import getFractionDigits from '@/utils/getFractionDigits';
import useAxios from 'axios-hooks';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const usePrice = (address: string) => {
  const [price, setPrice] = useState<{
    usd: string;
    raw: number;
  }>({
    raw: null,
    usd: null,
  });
  const intl = useIntl();

  const [{ data }] = useAxios({
    url: `https://api.covalenthq.com/v1/pricing/historical_by_address/1/usd/${address}/`,
  });

  useEffect(() => {
    const latestPrice = data?.data?.prices[0]?.price;
    if (latestPrice) {
      setPrice({
        usd: intl.formatNumber(latestPrice, {
          style: 'currency',
          currency: 'USD',
          ...getFractionDigits(latestPrice),
        }),
        raw: latestPrice,
      });
    }
  }, [data]);

  return price;
};

export default usePrice;
