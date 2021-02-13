import React from 'react';

export interface PricePerformanceProps
  extends Partial<ButtonHTMLAttributes<any>>,
    Record<string, any> {
  /**
   * Caption for the amount
   */
  amountSubtitle?: string;
  /**
   * The amount
   */
  amount?: string;
  /**
   * Performance
   */
  performance?: string;
}

const PerformanceHighlight = ({
  amountSubtitle,
  amount,
  performance,
}: PricePerformanceProps) => {
  return (
    <div className="flex-auto">
      <div className="px-4 py-4 flex flex-col bg-gray-700 w-1/2 border border-gray-500 border-opacity-30 rounded-l-md rounded-br-md float-left">
        <span className="text-xs opacity-50 pb-1">{amountSubtitle}</span>
        <span className="font-bold text-2xl text-gray-50">{amount}</span>
      </div>
      <div className="px-4 py-4 flex bg-gray-700 w-1/2 border border-l-0 border-gray-500 border-opacity-30 rounded-r-md rounded-tr-md">
        <span className="text-xs opacity-50 mr-1">PERFORMANCE</span>
        <span className="text-xs text-green-400 mr-1 h-fit-content">
          {performance}
        </span>
      </div>
    </div>
  );
};

export default PerformanceHighlight;
