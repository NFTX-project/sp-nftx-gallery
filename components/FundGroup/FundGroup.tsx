import Link from 'next/link';
import React, { ReactNode } from 'react';
import useMessage from '@/hooks/useMessage';
import { getFundKey } from '@/utils/getFundKey';
import GroupHeader from '@/components/GroupHeader';
import FundStatus from '@/components/FundStatus';
import VaultCard from '@/components/VaultCard';
import Divider from '@/components/Divider';
import { Columns } from './constants';
import Pill from '@/components/Pill';
import { Fund } from '@/types/fund';

interface FundGroupProps {
  namespace: string;
  slug?: string;
  title?: ReactNode;
  showLink?: boolean;
  funds: Fund[];
  columns?: Columns;
  fund?: Fund;
}

const gridCols = {
  [Columns.LIST]:
    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
  [Columns.FOCUS]:
    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4',
};

const FundGroup = ({
  slug,
  title,
  namespace,
  funds,
  columns = Columns.LIST,
  showLink,
  fund,
}: FundGroupProps) => {
  if (funds.length) {
    const sortedFunds = funds.sort((a) => (a.isD2Vault ? -1 : 1));

    return (
      <section className="font-sans font-bold">
        <GroupHeader
          title={title}
          namespace={namespace}
          fund={fund}
          slug={slug}
          showLink={showLink}
        />
        <Divider />
        <div className={`grid ${gridCols[columns]} gap-4`}>
          {sortedFunds.map((item) => {
            const fundKey = getFundKey(item);
            return (
              <Link
                key={item.fundToken.name}
                href={`/funds/${getFundKey(item)}/`}
              >
                <a aria-label={item.fundToken.name}>
                  <VaultCard
                    image={`/images/cards/${fundKey}-140.png`}
                    imageSrcSet={`/images/cards/${fundKey}-140@2x.png 2x`}
                    eyebrow={`${item?.holdings?.length || ''} ${
                      item.asset.name
                    }`}
                    title={
                      <div className="mt-2 flex items-center flex-wrap">
                        <span className="inline-block mr-2">
                          {`$${item.fundToken.symbol}`}
                        </span>
                        <Pill
                          highlight={item.isD2Vault}
                          text={useMessage(
                            item.isD2Vault ? 'pill.combined' : 'pill.single'
                          )}
                        />
                      </div>
                    }
                    stack={true}
                    text={
                      <FundStatus
                        amm={true}
                        fin={item.isFinalized}
                        ver={true}
                      />
                    }
                  />
                </a>
              </Link>
            );
          })}
        </div>
      </section>
    );
  }

  return null;
};

export default FundGroup;
