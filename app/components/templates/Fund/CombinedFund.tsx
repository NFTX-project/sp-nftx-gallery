import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/modules/Breadcrumbs';
import Button, { Size as ButtonSize } from '@/components/elements/Button';
import useMessage from '@/hooks/useMessage';
import Icon, { Icons, Size as IconSize } from '@/components/elements/Icon';
import FundStatus from '@/components/modules/FundStatus';
import trimAddress from '@/utils/trimAddress';
import { useVaultsContext } from '@/contexts/vaults';
import { useFundsContext } from '@/contexts/funds';
import FundGroup from '@/components/modules/FundGroup';
import Pill from '@/components/elements/Pill';
import { FundProps } from './types';
import usePrice from '@/hooks/usePrice';

const CombinedFund = ({ fundKey, ...fund }: FundProps) => {
  const vaults = useVaultsContext();
  const funds = useFundsContext();
  const [supportingFunds, setSupportingFunds] = useState([]);
  const price = usePrice(fund.fundToken.address);

  useEffect(() => {
    if (vaults.length && funds.length) {
      const supportingFundData = vaults.reduce((acc, cur) => {
        if (cur.d2VaultId === fund.vaultId) {
          return [
            ...acc,
            ...cur.d1VaultIds.map((d1) => {
              return funds.find((f) => f.vaultId === d1);
            }),
          ];
        }
        return acc;
      }, []);

      setSupportingFunds(supportingFundData);
    }
  }, [vaults, funds]);

  return (
    <div className="container mx-auto px-4 py-20 dark:text-gray-50 text-gray-800">
      <div className="md:flex">
        <div className="flex-none w-full md:w-3/5 lg:w-2/3 md:pr-16 lg:pr-24">
          <Breadcrumb />
          <h1 className="font-bold text-xl dark:text-gray-50 text-gray-800 mt-6 uppercase flex items-center">
            <img
              srcSet={`/images/cards/vault-${fund.vaultId}-140@2x.png 2x`}
              src={`/images/cards/vault-${fund.vaultId}-140.png`}
              alt={`${fund.fundToken.name} icon`}
              className="h-10 w-10 mr-4"
            />
            <span className="mr-2">{`$${fund.fundToken.name}`}</span>
            <Pill highlight={true} text={useMessage('pill.combined')} />
          </h1>
          <h2 className="text-3xl font-bold dark:text-gray-50 text-gray-800 mt-6 uppercase">
            {useMessage(`fund.combined.${fundKey}.title`)}
          </h2>
          <p className="mt-6 text-gray-300 max-w-prose">
            {useMessage(`fund.combined.${fundKey}.text`)}
          </p>
          <div className="mt-6 mb-6">
            <FundStatus
              amm={price.raw != null || false}
              ver={true}
              fin={fund.isFinalized}
            />
          </div>
        </div>
        <div className="flex-none w-full md:w-2/5 lg:w-1/3">
          <aside className="p-6 bg-gray-700 border-gray-600 border">
            <h4 className="mb-6 text-center uppercase text-gray-400 flex items-center flex-wrap justify-center">
              {useMessage('fund.combined.price', {
                price: (
                  <span className="ml-2 font-bold text-3xl dark:text-gray-50 text-gray-800">
                    {price.usd || '🦧'}
                  </span>
                ),
              })}
            </h4>
            <Button
              className="w-full"
              size={ButtonSize.LARGE}
              icon={Icons.EXTERNAL_LINK}
              href={`https://app.sushi.com/token/${fund.fundToken.address}`}
              target="_blank"
            >
              {useMessage('fund.combined.buy', {
                fund: (
                  <b className="font-bold uppercase">{`$${fund.fundToken.name}`}</b>
                ),
              })}
            </Button>
          </aside>
          <section className="pt-10 px-6">
            <dl className="mb-10">
              <div className="flex flex-col lg:flex-row lg:justify-between">
                <dt className="uppercase mr-1 text-gray-300">
                  {useMessage('fund.details.contractAddress')}
                </dt>
                <dd className="flex-1 text-green-400 overflow-hidden">
                  <Link
                    href={`https://etherscan.io/address/${fund.fundToken.address}`}
                  >
                    <a
                      className="lg:text-right block overflow-hidden overflow-ellipsis hover:underline"
                      target="_blank"
                      rel="noreferrer nofollow"
                      title={`View ${fund.fundToken.address} on etherscan`}
                    >
                      <span>{trimAddress(fund.fundToken.address)}</span>
                      <Icon
                        className="inline-block ml-1"
                        size={IconSize.SMALL}
                        name={Icons.EXTERNAL_LINK}
                      />
                      <span className="hidden">{fund.fundToken.address}</span>
                    </a>
                  </Link>
                </dd>
              </div>
            </dl>
            <h5 className="font-bold dark:text-gray-50 text-gray-800">
              {useMessage('fund.info.combined.title')}
            </h5>
            <p className="mt-1 dark:text-gray-50 text-gray-8000">
              {useMessage('fund.info.combined.text')}
            </p>
          </section>
        </div>
      </div>
      {supportingFunds.length ? (
        <section className="mt-24">
          <FundGroup
            showLink={false}
            funds={supportingFunds}
            namespace="funds.supporting"
          />
        </section>
      ) : null}
    </div>
  );
};

export default CombinedFund;
