import Link from 'next/link';
import React from 'react';
import useMessage from '../../hooks/message';
import FundStatus from '../FundStatus';
import Icon, { Icons } from '../Icon';
import VaultCard from '../VaultCard';
import { Columns } from './constants';

interface FundGroupProps {
  slug: string;
  namespace: string;
  funds: {
    asset: any;
    fundToken: any;
    isD2Vault: boolean;
    holdings?: string[];
  }[];
  columns?: Columns;
}

const gridCols = {
  [Columns.LIST]:
    'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
  [Columns.FOCUS]:
    'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4',
};

const FundGroup = ({
  slug,
  namespace,
  funds,
  columns = Columns.LIST,
}: FundGroupProps) => (
  <section className="font-sans font-bold">
    <header className="flex flex-col md:flex-row items-center justify-between mb-5">
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
    <div className="bg-gradient-to-r from-red-500 via-red-800 to-pink-500 h-0.5 mb-8" />
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {funds.map((item) => (
        <Link
          key={item.fundToken.name}
          href={`/funds/${item.fundToken.name.toLocaleLowerCase()}/`}
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
