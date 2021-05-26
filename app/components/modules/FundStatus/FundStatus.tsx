import React from 'react';
import Icon, { Icons, Size } from '@/components/elements/Icon';
import useMessage from '@/hooks/useMessage';

export interface FundStatusProps {
  /**
   * Finalised
   */
  fin: boolean;
  /**
   * Verified
   */
  ver: boolean;
  /**
   * Swappable via an AMM
   */
  amm: boolean;
}

const FundStatus = ({ fin, ver, amm }: FundStatusProps) => {
  const status = [
    {
      key: 'fin',
      enabled: fin,
    },
    {
      key: 'ver',
      enabled: ver,
    },
    {
      key: 'amm',
      enabled: amm,
    },
  ];

  return (
    <aside>
      <dl className="flex flex-wrap font-semibold text-xs">
        {status.map((s) => (
          <div key={s.key} className="flex items-center mr-1">
            <dd>
              <Icon
                size={Size.SMALL}
                className={`${
                  s.enabled ? 'text-green-600 dark:text-green-400' : ''
                }`}
                name={s.enabled ? Icons.CHECK_CIRCLE : Icons.X_CIRCLE}
              />
            </dd>
            <dt className="ml-0.5">{useMessage(`fund.status.${s.key}`)}</dt>
          </div>
        ))}
      </dl>
    </aside>
  );
};

export default FundStatus;
