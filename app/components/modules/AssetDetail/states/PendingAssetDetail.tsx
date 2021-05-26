import React from 'react';
import DefaultAssetDetail from './DefaultAssetDetail';

const PendingAssetDetail = () => (
  <DefaultAssetDetail
    className="animate-pulse"
    fundSymbol={null}
    fundAddress={null}
    openseaUrl={null}
    assetType={null}
    fundName={null}
    vaultId={null}
    lastSalePrice={null}
    performance={null}
    placeholder={
      <div className="rounded-full w-36 h-36 max-w-full max-h-full dark:bg-gray-600 bg-gray-100" />
    }
    eyebrow={
      <span className="block w-1/4 dark:bg-gray-600 bg-gray-100">
        <span className="invisible">{'N'}</span>
      </span>
    }
    title={
      <span className="block w-1/2 dark:bg-gray-600 bg-gray-100">
        <span className="invisible">{'F'}</span>
      </span>
    }
    text={
      <span className="block w-3/4 dark:bg-gray-600 bg-gray-100">
        <span className="invisible">{'T'}</span>
      </span>
    }
  />
);

export default PendingAssetDetail;
