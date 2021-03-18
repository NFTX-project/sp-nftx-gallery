import Link from 'next/link';
import React, { ReactNode } from 'react';
import useMessage from '@/hooks/useMessage';
import { getFundKey } from '@/utils/getFundKey';
import GroupHeader from '@/components/modules/GroupHeader';
import FundStatus from '@/components/modules/FundStatus';
import VaultCard from '@/components/modules/VaultCard';
import Divider from '@/components/elements/Divider';
import Pill from '@/components/elements/Pill';
import { Columns } from './constants';
import { Fund } from '@/types/fund';
import { useVaultsContext } from '@/contexts/vaults';

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
    const vaults = useVaultsContext();
    const sortedFunds = funds.sort((a) => (a.isD2Vault ? -1 : 1));
    const getEyebrow = (item: Fund) => {
      if (item.isD2Vault) {
        const count =
          vaults.find((v) => v.d2VaultId === item.vaultId)?.d1VaultIds
            ?.length || null;
        return useMessage('funds.group.eyebrow.combined', {
          type: item?.fundToken.name,
          count,
        });
      }

      return useMessage('funds.group.eyebrow.single', {
        asset: item.asset.name || item.fundToken.name,
        count: item?.holdings?.length || '',
      });
    };

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
            if (!fundKey) {
              return null;
            }

            return (
              <Link
                key={item.fundToken.name}
                href={`/funds/${getFundKey(item)}/`}
              >
                <a aria-label={item.fundToken.name}>
                  <VaultCard
                    image={`/images/cards/vault-${item.vaultId}-140.png`}
                    imageSrcSet={`/images/cards/vault-${item.vaultId}-140@2x.png 2x`}
                    imageAlt={item.asset.name}
                    eyebrow={getEyebrow(item)}
                    title={
                      <div className="mt-2 flex items-center flex-wrap">
                        <span className="inline-block mr-2 uppercase">
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
