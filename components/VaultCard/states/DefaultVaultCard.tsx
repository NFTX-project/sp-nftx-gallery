import React from 'react';
import type { VaultCardProps } from '../types';

const DefaultVaultCard = ({
  image,
  eyebrow,
  title,
  text,
  background,
  stack,
  className,
  placeholder,
}: VaultCardProps) => {
  return (
    <div className={className}>
      <article className="text-gray-50 border-2 border-gray-500 border-opacity-30 text-left break-words">
        <div
          className="p-12 flex justify-center items-center bg-gray-700"
          style={{ backgroundColor: background }}
        >
          <div className="relative h-36">
            {placeholder}
            {image && (
              <img
                loading="lazy"
                src={image}
                alt={`${eyebrow} ${title}`}
                className="w-full object-contain h-36"
              />
            )}
          </div>
        </div>
        <div className="p-6 bg-gray-800 border-t-2 border-gray-500 border-opacity-30">
          {eyebrow && (
            <h4 className="uppercase text-sm mb-1 text-gray-50">{eyebrow}</h4>
          )}
          <h3 className="font-bold text-xl text-gray-50">{title}</h3>
          <div className="uppercase text-xs text-gray-400 mt-2">{text}</div>
        </div>
      </article>
      {stack && (
        <>
          <div className="bg-gray-800 h-1 mx-1 border-l border-b border-r border-gray-500 border-opacity-30" />
          <div className="bg-gray-800 h-1 mx-2 border-l border-b border-r border-gray-500 border-opacity-30" />
        </>
      )}
    </div>
  );
};

export default DefaultVaultCard;
