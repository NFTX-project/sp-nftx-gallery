import React, { useMemo } from 'react';
import useMessage from '../../hooks/message';
import FundGroup from '../FundGroup';

interface FundGroupProps {
  funds: {
    asset: any;
    fundToken: any;
    isD2Vault: boolean;
  }[];
}

/**
 * groupFunds
 * @param funds Array of fund objects
 *
 * Take a flat array of fund objects and group them into their same types based on asset address
 */
const groupFunds = (
  funds: {
    asset: any;
    fundToken: any;
    isD2Vault: boolean;
  }[]
) =>
  funds.reduce((prev, cur) => {
    if (prev[cur.asset.address]) {
      prev[cur.asset.address].funds.push(cur);
    } else {
      prev[cur.asset.address] = {
        key: cur.asset.name.toLocaleLowerCase().replace(/ /g, '-'),
        funds: [cur],
      };
    }
    return prev;
  }, {});

const FundGroups = ({ funds }: FundGroupProps) => {
  const grouped = useMemo(() => {
    return Object.entries(groupFunds(funds));
  }, [funds]);

  if (grouped.length === 0) {
    return (
      <div className="my-6">
        <h3 className="text-gray-300">{useMessage('funds.groups.none')}</h3>
      </div>
    );
  }

  return (
    <>
      {grouped.map(([key, fund]: [string, any]) => (
        <div key={key} className="mb-24">
          <FundGroup slug={fund.key} namespace={fund.key} funds={fund.funds} />
        </div>
      ))}
    </>
  );
};

export default React.memo(FundGroups);
