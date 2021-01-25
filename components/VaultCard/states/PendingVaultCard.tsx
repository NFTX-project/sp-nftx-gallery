import React from 'react';
import VaultCard from './DefaultVaultCard';

const PendingVaultCard = () => (
  <VaultCard
    className="animate-pulse"
    placeholder={
      <div className="rounded-full w-36 h-36 max-w-full max-h-full bg-gray-600" />
    }
    eyebrow={
      <span className="block w-1/4 bg-gray-600">
        <span className="invisible">{'N'}</span>
      </span>
    }
    title={
      <span className="block w-3/4 bg-gray-600">
        <span className="invisible">{'F'}</span>
      </span>
    }
    text={
      <span className="block w-1/2 bg-gray-600">
        <span className="invisible">{'T'}</span>
      </span>
    }
  />
);

export default React.memo(PendingVaultCard);
