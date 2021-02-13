import React from 'react';
import { AssetCardStatus } from './constants';
import PendingVaultCard from './states/PendingAssetCard';
import DefaultVaultCard from './states/DefaultAssetCard';
import type { AssetCardProps } from './types';

const VaultCard = ({ status, ...props }: AssetCardProps) => {
  if (status === AssetCardStatus.PENDING) {
    return <PendingVaultCard />;
  }

  return <DefaultVaultCard {...props} />;
};

export default VaultCard;
