import Link from 'next/link';
import React from 'react';
import FundStatus from '../../components/FundStatus';
import Icon, { Icons } from '../../components/Icon';
import VaultCard from '../../components/VaultCard';
import useMessage from '../../hooks/message';
import funds from '../../constants/funds.json';

const FundsPage = () => {
  const grouped = funds.reduce((prev, cur) => {
    if (prev[cur.asset.address]) {
      prev[cur.asset.address].funds.push(cur);
    } else {
      prev[cur.asset.address] = {
        name: cur.asset.name,
        key: cur.asset.name.toLocaleLowerCase().replace(/ /g, '-'),
        funds: [cur],
      };
    }
    return prev;
  }, {});

  return (
    <div className="container mx-auto pt-12 pb-24 px-4">
      {Object.entries(grouped).map(([key, fund]: [string, any]) => (
        <section key={key} className="mb-24 font-sans font-bold">
          <header className="flex items-center justify-between mb-6">
            <h3 className="text-gray-50 font-sans text-2xl">
              {useMessage(`funds.${fund.key}.title`)}
            </h3>
            <Link href={`/funds/${fund.key}`}>
              <a className="text-gray-50 text-lg font-sans flex items-center">
                {useMessage(`funds.${fund.key}.link`)}
                <Icon name={Icons.CHEVRON_RIGHT} />
              </a>
            </Link>
          </header>
          <div className="bg-gradient-to-r from-yellow-500 via-green-500 to-purple-500 h-0.5 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {fund.funds.map((item) => (
              <Link
                key={item.asset.name}
                href={`/funds/${item.fundToken.symbol.toLocaleLowerCase()}/`}
              >
                <a>
                  <VaultCard
                    image={`https://via.placeholder.com/160x160.png?text=${item.fundToken.symbol}`}
                    eyebrow={`${item?.holdings?.length || ''} ${
                      item.asset.name
                    } ${item.isD2Vault ? 'D2' : ''}`}
                    title={item.fundToken.name}
                    stack={true}
                    text={<FundStatus amm={true} fin={true} ver={true} />}
                  />
                </a>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default FundsPage;
