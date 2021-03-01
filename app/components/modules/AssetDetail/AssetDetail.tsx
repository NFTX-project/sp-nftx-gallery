import React from 'react';
import { AssetDetailStatus } from './constants';
import DefaultAssetDetail from './states/DefaultAssetDetail';
import PendingAssetDetail from './states/PendingAssetDetail';
import type { AssetDetailProps } from './types';

const AssetDetail = ({ status, ...props }: AssetDetailProps) => {
  if (status === AssetDetailStatus.PENDING) {
    return <PendingAssetDetail />;
  }

  return <DefaultAssetDetail {...props} />;
};

export default AssetDetail;
