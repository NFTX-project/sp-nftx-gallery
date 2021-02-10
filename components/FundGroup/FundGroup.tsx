import Link from 'next/link';
import React from 'react';
import useMessage from '../../hooks/message';
import FundStatus from '../FundStatus';
import Icon, { Icons } from '../Icon';
import VaultCard from '../VaultCard';

interface FundGroupProps {
  slug: string;
  namespace: string;
  funds: {
    asset: any;
    fundToken: any;
    isD2Vault: boolean;
    holdings?: number[];
  }[];
  cols?: number;
  mdCols?: number;
  lgCols?: number;
  xlCols?: number;
  xxlCols?: number;
}

const FundGroup = ({
  slug,
  namespace,
  funds,
  cols = 1,
  mdCols = 2,
  lgCols = 2,
  xlCols = 3,
  xxlCols = 5,
}: FundGroupProps) => (
  <section className="font-sans font-bold">
    <header className="flex items-center justify-between mb-6">
      <h3 className="text-gray-50 font-sans text-2xl">
        {useMessage(`funds.${namespace}.title`)}
      </h3>
      <Link href={`/funds/${slug}`}>
        <a className="text-gray-50 text-lg font-sans flex items-center">
          {useMessage(`funds.${namespace}.link`)}
          <Icon name={Icons.CHEVRON_RIGHT} />
        </a>
      </Link>
    </header>
    <div className="bg-gradient-to-r from-yellow-500 via-green-500 to-purple-500 h-0.5 mb-8" />
    <div
      className={`grid grid-cols-${cols} md:grid-cols-${mdCols} lg:grid-cols-${lgCols} xl:grid-cols-${xlCols} 2xl:grid-cols-${xxlCols} gap-4`}
    >
      {funds.map((item) => (
        <Link
          key={item.fundToken.name}
          href={`/funds/${item.fundToken.symbol.toLocaleLowerCase()}/`}
        >
          <a>
            <VaultCard
              image={`https://via.placeholder.com/160x160.png?text=${item.fundToken.symbol}`}
              eyebrow={`${item?.holdings?.length || ''} ${item.asset.name} ${
                item.isD2Vault ? 'D2' : ''
              }`}
              title={item.fundToken.name}
              stack={true}
              text={<FundStatus amm={true} fin={true} ver={true} />}
            />
          </a>
        </Link>
      ))}
    </div>
  </section>
);

export default FundGroup;
