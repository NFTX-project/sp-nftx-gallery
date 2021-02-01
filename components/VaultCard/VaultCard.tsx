import React from 'react';
import { VaultCardStatus } from './constants';
import PendingVaultCard from './states/PendingVaultCard';
import DefaultVaultCard from './states/DefaultVaultCard';
import type { VaultCardProps } from './types';

const VaultCard = ({ status, ...props }: VaultCardProps) => {
  if (status === VaultCardStatus.PENDING) {
    return <PendingVaultCard />;
  }

  return <DefaultVaultCard {...props} />;
};

export default VaultCard;
