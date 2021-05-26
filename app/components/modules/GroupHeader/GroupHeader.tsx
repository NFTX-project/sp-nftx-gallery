import React, { ReactNode } from 'react';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import Tvl from '@/components/elements/Tvl';
import Pill from '@/components/elements/Pill';
import Icon, { Icons } from '@/components/elements/Icon';
import useMessage from '@/hooks/useMessage';
import usePrice from '@/hooks/usePrice';
import { Fund } from '@/types/fund';

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
      <h3 className="dark:text-gray-50 text-gray-800 flex flex-wrap items-center font-sans text-2xl mb-2 lg:mb-0">
        <Link href={`${slug}`}>
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
      <span className="inline-flex items-center justify-center md:justify-start flex-wrap mb-2 lg:mb-0 lg:ml-8 text-sm uppercase dark:text-gray-300 text-gray-600">
        {price.usd != null && (
          <span className="mr-2 lg:mr-4">
            <FormattedMessage
              id="group.fund.price"
              values={{
                price: (
                  <span className="ml-1 dark:text-green-500 text-green-600">
                    {price.usd}
                  </span>
                ),
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
                  <span className="ml-1 dark:text-green-500 text-green-600">
                    <Tvl price={price.raw} quantity={fund.holdings.length} />
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
  title?: ReactNode;
}

const GroupHeader = ({
  namespace,
  slug,
  title,
  showLink = true,
  fund,
}: GroupHeaderProps) => {
  const isFund = fund != null;

  return (
    <header className="flex flex-col md:flex-row items-center justify-between mb-5">
      {isFund ? (
        <FundGroupHeader fund={fund} namespace={namespace} slug={slug} />
      ) : (
        <h3 className="dark:text-gray-50 text-gray-900 font-sans text-2xl">
          {title || useMessage(`${namespace}.title`)}
        </h3>
      )}
      {showLink && (
        <Link href={slug}>
          <a className="dark:text-gray-50 text-gray-900 text-lg font-sans flex items-center">
            {useMessage(`${namespace}.link`)}
            <Icon name={Icons.CHEVRON_RIGHT} />
          </a>
        </Link>
      )}
    </header>
  );
};

export default GroupHeader;
