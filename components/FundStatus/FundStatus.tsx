import React from 'react';
import Icon, { Icons } from '../Icon';
import { Size } from '../Icon/constants';

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
      abbr: 'FIN',
      text: 'Finalised',
    },
    {
      key: 'ver',
      enabled: ver,
      abbr: 'VER',
      text: 'Verified',
    },
    {
      key: 'amm',
      enabled: amm,
      abbr: 'AMM',
      text: 'Swappable via an AMM',
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
                className={`${s.enabled ? 'text-green-400' : ''}`}
                name={s.enabled ? Icons.CHECK_CIRCLE : Icons.X_CIRCLE}
              />
            </dd>
            <dt className="ml-0.5" title={s.text}>
              {s.abbr}
            </dt>
          </div>
        ))}
      </dl>
    </aside>
  );
};

export default FundStatus;
