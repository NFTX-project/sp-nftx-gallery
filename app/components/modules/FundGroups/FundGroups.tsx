import React, { useMemo } from 'react';
import useMessage from '@/hooks/useMessage';
import { getCategoryKey } from '@/utils/getCategoryKey';
import FundGroup from '@/components/modules/FundGroup';
import { Fund } from '@/types/fund';
import { FormattedMessage } from 'react-intl';

interface FundGroupProps {
  funds: Fund[];
  vaults?: {
    d2VaultId: number;
    d1VaultIds: number[];
  }[];
  showLink?: boolean;
  namespace?: string;
}

/**
 * groupFunds
 * @param funds Array of fund objects
 * @params vaults Optional array of D2 vaults to map
 *
 * Take a flat array of fund objects and group them into their same types based on asset address
 * If a vaults array is passed in, use it to map the D2 in the same group as the D1s
 *
 * [{ ...fund}, {...fund}]
 * =>
 * {
 *   "0xAssetAddress": [...fund,  ...fund, ...fund], etc.
 * }
 */
const groupFunds = (
  funds: FundGroupProps['funds'],
  vaults: FundGroupProps['vaults']
) => {
  const groups = {};

  const addToGroup = (key: string, fund: FundGroupProps['funds'][0]) => {
    if (groups[key]) {
      groups[key].funds.push(fund);
    } else {
      groups[key] = {
        key: getCategoryKey(fund) || fund.fundToken.name,
        funds: [fund],
      };
    }
  };

  funds.forEach((fund) => {
    if (fund.isD2Vault && Array.isArray(vaults)) {
      const vaultItem = vaults.find((v) => {
        if (Number(v.d2VaultId) === Number(fund.vaultId)) {
          return true;
        }
      });
      if (vaultItem) {
        // get the asset.address from the first matching item in the d1 Vault list
        const d1Item = funds.find((f) =>
          vaultItem.d1VaultIds.includes(f.vaultId)
        );
        // grab the matching asset address and fallback to current fund just in case
        const key = d1Item?.asset?.address;

        if (key) {
          addToGroup(key, fund);
        }
      }
    } else {
      if (fund.asset.address) {
        addToGroup(fund.asset.address, fund);
      }
    }
  });

  return groups;
};

const getFundName = (funds: Fund[]) => {
  // grab the NFT asset name from first non d2 child funds
  const assetTitle = funds.find((f) => !f.isD2Vault)?.asset?.name;

  if (!assetTitle) {
    // if we haven't got one then return the fundToken name
    return funds[0]?.fundToken?.name;
  }

  return assetTitle;
};

const FundGroups = ({
  funds,
  vaults,
  showLink,
  namespace = 'funds',
}: FundGroupProps) => {
  const grouped = useMemo(() => {
    return Object.entries(groupFunds(funds, vaults));
  }, [funds]);

  if (grouped.length === 0) {
    return (
      <div className="my-6">
        <h3 className="dark:text-gray-300 text-gray-600">
          {useMessage('funds.groups.none')}
        </h3>
      </div>
    );
  }

  return (
    <>
      {grouped.map(([key, fund]: [string, any]) => (
        <div key={key} className="mb-24">
          <FundGroup
            title={
              <FormattedMessage
                id="funds.dynamic.title"
                values={{
                  fund: getFundName(fund.funds),
                }}
              />
            }
            showLink={showLink}
            slug={fund.key}
            namespace={`${namespace}.${fund.key}`}
            funds={fund.funds}
          />
        </div>
      ))}
    </>
  );
};

export default React.memo(FundGroups);
