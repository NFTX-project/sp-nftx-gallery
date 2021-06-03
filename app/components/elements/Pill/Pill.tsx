import React, { ReactNode } from 'react';

export interface PillProps {
  highlight?: boolean;
  text?: ReactNode;
}

const Pill = ({ highlight, text }: PillProps) => (
  <span
    className={`inline-flex rounded-full text-xs uppercase py-0.25 px-1.5 border ${
      highlight
        ? 'dark:border-red-400 dark:text-red-400 border-red-500 text-red-500'
        : 'dark:border-gray-600 dark:text-gray-400 border-gray-700 text-gray-500'
    }`}
  >
    {text}
  </span>
);

export default Pill;
