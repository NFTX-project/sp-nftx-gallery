import React from 'react';
import Icon, { Icons } from '../Icon';

export interface FundStatusProps {
  /**
   * Finalised
   */
  fin: boolean,
  /**
   * Verified
   */
  ver: boolean,
  /**
   * Swappable via an AMM
   */
  amm: boolean,
}

const FundStatus = ({
  fin,
  ver,
  amm
}: FundStatusProps) => {

  return (
    <aside>
      <dl className="flex font-semibold text-xs">
        <div className="flex items-center mr-1">
          <dd>
            <Icon className="h-4 w-4" name={fin ? Icons.checkCircle : Icons.xCircle}/>
          </dd>
          <dt title="Finalised">{'FIN'}</dt>
        </div>
        <div className="flex items-center mr-1">
          <dd>
            <Icon className="h-4 w-4" name={ver ? Icons.checkCircle : Icons.xCircle}/>
          </dd>
          <dt title="Verified">{'VER'}</dt>
        </div>
        <div className="flex items-center mr-1">
          <dd>
            <Icon className="h-4 w-4" name={amm ? Icons.checkCircle : Icons.xCircle}/>
          </dd>
          <dt title="Swappable via an AMM">{'AMM'}</dt>
        </div>
      </dl>
    </aside>
  )
};

export default FundStatus;
