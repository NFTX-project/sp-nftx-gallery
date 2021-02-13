import React from 'react';
import { AssetDetailStatus } from './constants';
import DefaultVaultCard from './states/DefaultAssetDetail';
import type { AssetDetailProps } from './types';

const AssetDetail = ({ status, ...props }: AssetDetailProps) => {
  return <DefaultVaultCard {...props} />;
};

export default AssetDetail;
