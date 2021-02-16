import Link from 'next/link';
import React from 'react';
import useMessage from '../../hooks/message';
import { getFundKey } from '../../utils/getFundKey';
import FundStatus from '../FundStatus';
import Icon, { Icons } from '../Icon';
import VaultCard from '../VaultCard';
import Divider from '../Divider';
import { Columns } from './constants';
import Pill from '../Pill';

interface FundGroupProps {
  namespace: string;
  slug?: string;
  showLink?: boolean;
  funds: {
    isFinalized: boolean;
    asset: any;
    fundToken: any;
    isD2Vault: boolean;
    holdings?: string[];
  }[];
  columns?: Columns;
}

const gridCols = {
  [Columns.LIST]:
    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
  [Columns.FOCUS]:
    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4',
};

const FundGroup = ({
  slug,
  namespace,
  funds,
  columns = Columns.LIST,
  showLink = true,
}: FundGroupProps) => {
  if (funds.length) {
    return (
      <section className="font-sans font-bold">
        <header className="flex flex-col md:flex-row items-center justify-between mb-5">
          <h3 className="text-gray-50 font-sans text-2xl">
            {useMessage(`funds.${namespace}.title`)}
          </h3>
          {showLink && (
            <Link href={`/funds/${slug}`}>
              <a className="text-gray-50 text-lg font-sans flex items-center">
                {useMessage(`funds.${namespace}.link`)}
                <Icon name={Icons.CHEVRON_RIGHT} />
              </a>
            </Link>
          )}
        </header>
        <Divider />
        <div className={`grid ${gridCols[columns]} gap-4`}>
          {funds.map((item) => (
            <Link
              key={item.fundToken.name}
              href={`/funds/${getFundKey(item)}/`}
            >
              <a>
                <VaultCard
                  image={`https://via.placeholder.com/160x160.png?text=${item.fundToken.symbol}`}
                  eyebrow={`${item?.holdings?.length || ''} ${item.asset.name}`}
                  title={
                    <div className="mt-2 flex items-center flex-wrap">
                      <span className="inline-block mr-2">
                        {item.fundToken.name}
                      </span>
                      <Pill
                        text={useMessage(
                          item.isD2Vault ? 'pill.combined' : 'pill.single'
                        )}
                      />
                    </div>
                  }
                  stack={true}
                  text={
                    <FundStatus amm={true} fin={item.isFinalized} ver={true} />
                  }
                />
              </a>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return null;
};

export default FundGroup;
