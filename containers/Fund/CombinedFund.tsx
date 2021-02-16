import React, { useContext, useEffect, useState } from 'react';
import { FundProps } from './types';
import Breadcrumb from '@/components/Breadcrumbs';
import Button, { Size } from '@/components/Button';
import useMessage from '@/hooks/message';
import useAxios from 'axios-hooks';
import { useIntl } from 'react-intl';
import { Icons } from '@/components/Icon';
import FundStatus from '@/components/FundStatus';
import trimAddress from '@/utils/trimAddress';
import { useVaultsContext } from '@/contexts/vaults';
import { useFundsContext } from '@/contexts/funds';
import FundGroup from '@/components/FundGroup';
import Pill from '@/components/Pill';

const CombinedFund = ({ fundKey, ...fund }: FundProps) => {
  const intl = useIntl();
  const vaults = useVaultsContext();
  const funds = useFundsContext();
  const [supportingFunds, setSupportingFunds] = useState([]);
  const [price, setPrice] = useState(null);
  const [{ data }] = useAxios({
    url: `https://api.covalenthq.com/v1/pricing/historical_by_address/1/usd/${fund.fundToken.address}/`,
  });

  useEffect(() => {
    const latestPrice = data?.data?.prices[0]?.price;
    if (latestPrice) {
      setPrice(
        intl.formatNumber(latestPrice, {
          style: 'currency',
          currency: 'USD',
        })
      );
    }
  }, [data]);

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
    <div className="container mx-auto px-4 py-20 text-gray-50">
      <div className="md:flex">
        <div className="flex-none w-full md:w-3/5 lg:w-2/3 pr-24">
          <Breadcrumb />
          <h1 className="font-bold text-xl text-gray-50 mt-6 uppercase flex items-center">
            <img
              src={`/images/funds/combined/${fundKey}.svg`}
              alt=""
              className="h-10 w-10 mr-4"
            />
            <span className="mr-2">{`$${fund.fundToken.name}`}</span>
            <Pill highlight={true} text={useMessage('pill.combined')} />
          </h1>
          <h2 className="text-3xl font-bold text-gray-50 mt-6 uppercase">
            {useMessage(`fund.combined.${fundKey}.title`)}
          </h2>
          <p className="mt-6 text-gray-400">
            {useMessage(`fund.combined.${fundKey}.text`)}
          </p>
          <div className="mt-6 mb-6">
            <FundStatus
              amm={price || false}
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
                  <span className="ml-2 font-bold text-3xl text-gray-50">
                    {price || <span className="animate-spin">{'🦧'}</span>}
                  </span>
                ),
              })}
            </h4>
            <Button
              className="w-full"
              size={Size.LARGE}
              icon={Icons.EXTERNAL_LINK}
              href={`https://app.sushiswap.fi/token/${fund.fundToken.address}`}
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
                  <span
                    className="lg:text-right block overflow-hidden overflow-ellipsis"
                    title={fund.fundToken.address}
                  >
                    {trimAddress(fund.fundToken.address)}
                    <span className="hidden">{fund.fundToken.address}</span>
                  </span>
                </dd>
              </div>
            </dl>
            <h5 className="font-bold text-gray-50">
              {useMessage('fund.info.combined.title')}
            </h5>
            <p className="mt-1 text-gray-500">
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
            namespace="supporting"
          />
        </section>
      ) : null}
    </div>
  );
};

export default CombinedFund;
