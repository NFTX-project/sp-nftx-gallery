import useMessage from '@/hooks/useMessage';
import usePrice from '@/hooks/usePrice';
import { Fund } from '@/types/fund';
import Pill from '@/components/Pill';
import Link from 'next/link';
import React from 'react';
import Icon, { Icons } from '../Icon';
import { FormattedMessage, FormattedNumber } from 'react-intl';

const FundGroupHeader = ({
  fund,
  slug,
}: {
  fund?: Fund;
  slug?: string;
  namespace: string;
}) => {
  const price = usePrice(fund.fundToken.address);

  return (
    <div className="flex flex-col lg:items-center lg:flex-row">
      <h3 className="text-gray-50 flex flex-wrap items-center font-sans text-2xl mb-2 lg:mb-0">
        <Link href={`/funds/${slug}`}>
          <a className="mr-2">
            {useMessage(`group.fund.title`, {
              fund: `$${fund.fundToken.symbol}`,
            })}
          </a>
        </Link>
        <Pill
          highlight={fund.isD2Vault}
          text={useMessage(fund.isD2Vault ? 'pill.combined' : 'pill.single')}
        />
      </h3>
      <span className="inline-flex items-center justify-center md:justify-start flex-wrap mb-2 lg:mb-0 lg:ml-8 text-sm uppercase text-gray-300">
        {price.usd != null && (
          <span className="mr-2 lg:mr-4">
            <FormattedMessage
              id="group.fund.price"
              values={{
                price: <span className="ml-1 text-green-500">{price.usd}</span>,
              }}
            />
          </span>
        )}
        {!fund.isD2Vault && price.raw != null && (
          <span>
            <FormattedMessage
              id="group.fund.tvl"
              values={{
                tvl: (
                  <span className="ml-1 text-green-500">
                    <FormattedNumber
                      style="currency"
                      value={price.raw * fund.holdings.length}
                      currency="USD"
                      maximumFractionDigits={0}
                      minimumFractionDigits={0}
                    />
                  </span>
                ),
              }}
            />
          </span>
        )}
      </span>
    </div>
  );
};

interface GroupHeaderProps {
  namespace: string;
  slug: string;
  showLink?: boolean;
  fund?: Fund;
}

const GroupHeader = ({
  namespace,
  slug,
  showLink = true,
  fund,
}: GroupHeaderProps) => {
  const isFund = fund != null;

  return (
    <header className="flex flex-col md:flex-row items-center justify-between mb-5">
      {isFund ? (
        <FundGroupHeader fund={fund} namespace={namespace} slug={slug} />
      ) : (
        <h3 className="text-gray-50 font-sans text-2xl">
          {useMessage(`${namespace}.title`)}
        </h3>
      )}
      {showLink && (
        <Link href={`/funds/${slug}`}>
          <a className="text-gray-50 text-lg font-sans flex items-center">
            {useMessage(`${namespace}.link`)}
            <Icon name={Icons.CHEVRON_RIGHT} />
          </a>
        </Link>
      )}
    </header>
  );
};

export default GroupHeader;
