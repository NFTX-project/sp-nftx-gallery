import React, { ReactNode } from 'react';

export interface PillProps {
  highlight?: boolean;
  text?: ReactNode;
}

const Pill = ({ highlight, text }: PillProps) => (
  <span
    className={`inline-flex rounded-full text-xs uppercase py-0.25 px-1.5 border ${
      highlight
        ? 'border-red-400 text-red-400'
        : 'border-gray-600 text-gray-400'
    }`}
  >
    {text}
  </span>
);

export default Pill;
