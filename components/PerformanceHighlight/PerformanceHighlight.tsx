import React, { ButtonHTMLAttributes } from 'react';
import useMessage from '../../hooks/message';
import toEth from '@/utils/toEth';

export interface PricePerformanceProps
  extends Partial<ButtonHTMLAttributes<any>>,
    Record<string, any> {
  /**
   * The amount
   */
  amount?: number;
  /**
   * Performance
   */
  performance?: number;
}

const PerformanceHighlight = ({
  amount,
  performance,
}: PricePerformanceProps) => {
  return (
    <div className="flex items-start uppercase">
      <div className="px-6 py-4 flex flex-col bg-gray-700 border border-gray-500 border-opacity-30 rounded-l-md rounded-br-md">
        <span className="text-xs opacity-50 pb-1">
          {useMessage('widgets.price.lastSalePrice')}
        </span>
        <span className="font-bold text-2xl text-gray-50">
          {'Ξ'}
          {amount ? toEth(amount) : 'N/A'}
        </span>
      </div>
      <div className="px-6 py-4 flex flex-col lg:flex-row items-start bg-gray-800 border border-l-0 border-gray-500 border-opacity-30 rounded-r-md rounded-tr-md">
        <span className="text-xs opacity-50 mr-1">
          {useMessage('widgets.price.performance')}
        </span>
        <span className="text-md leading-5 font-bold text-green-400 lg:ml-1">
          {performance ? `${performance}%` : '🦧'}
        </span>
      </div>
    </div>
  );
};

export default PerformanceHighlight;
