import React from 'react';
import { VaultCardStatus, VaultCardType } from './constants';
import PendingVaultCard from './states/PendingVaultCard';
import DefaultVaultCard from './states/DefaultVaultCard';
import AssetCard from './adapters/AssetCard';
import type { VaultCardProps } from './types';

const VaultCard = ({ status, type, asset, ...props }: VaultCardProps) => {
  if (status === VaultCardStatus.PENDING) {
    return <PendingVaultCard />;
  }

  if (type === VaultCardType.ASSET && asset != null) {
    return <AssetCard {...asset} className={props.className} />;
  }

  return <DefaultVaultCard {...props} />;
};

export default VaultCard;
