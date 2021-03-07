import getFractionDigits from '@/utils/getFractionDigits';
import React from 'react';
import { FormattedNumber } from 'react-intl';

interface TvlProps {
  price: number;
  quantity: number;
}

const Tvl = React.memo(({ price, quantity }: TvlProps) => {
  const tvl = price * quantity;
  return (
    <FormattedNumber
      value={tvl}
      style="currency"
      currency="USD"
      {...getFractionDigits(tvl)}
    />
  );
});

Tvl.displayName = 'Tvl';

export default Tvl;
