import React, { ReactNode } from 'react';

export interface PillProps {
  highlight?: boolean;
  text?: ReactNode;
}

const Pill = ({ highlight, text }: PillProps) => (
  <span
    className={`inline-flex rounded-full text-xs uppercase py-0.5 px-2 border ${
      highlight
        ? 'border-red-500 text-red-500'
        : 'border-gray-600 text-gray-400'
    }`}
  >
    {text}
  </span>
);

export default Pill;
