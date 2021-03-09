import React from 'react';
import useMessage from '@/hooks/useMessage';
import { Asset } from '@/types/asset';
import DefaultVaultCard from '../states/DefaultVaultCard';
import toEth from '@/utils/toEth';

const AssetCard = (
  props: Asset & {
    className?: string;
  }
) => {
  const getCardText = (asset: Asset) => {
    if (asset?.last_sale?.total_price) {
      return useMessage('asset.card.lastSalePrice', {
        price: toEth(asset?.last_sale?.total_price),
      });
    }

    return '';
  };

  return (
    <DefaultVaultCard
      className={props.className}
      eyebrow={props.asset_contract.name}
      image={props.image_preview_url}
      title={props.name || props.token_id}
      // seems to come through as hex without the hex
      background={props.background_color ? `#${props.background_color}` : null}
      text={getCardText(props)}
      stack={false}
    />
  );
};

export default AssetCard;
