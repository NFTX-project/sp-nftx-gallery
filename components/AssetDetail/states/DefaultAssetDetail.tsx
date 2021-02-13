import React from 'react';
import type { AssetDetailProps } from '../types';
import FundStatus from '../../FundStatus';
import Button from '../../Button';
import PerformanceHighlight from '../../PerformanceHighlight';
import { Size, Kind } from '../../Button/constants';

const DefaultVaultCard = ({
  image,
  eyebrow,
  title,
  name,
  description,
  background,
  stack,
  className,
  placeholder,
}: AssetDetailProps) => {
  return (
    <div className={className}>
      <article className="text-gray-50 border-2 border-gray-500 border-opacity-30 text-left break-words">
        <div className="flex flex-row w-full">
          <div
            className="px-12 py-24 flex justify-center items-center bg-gray-700 w-1/2"
            style={{ backgroundColor: background }}
          >
            <div className="relative h-full">
              {placeholder}
              {image && (
                <img
                  loading="lazy"
                  src={image}
                  alt={`${eyebrow} ${title}`}
                  className="w-full object-contain h-full"
                />
              )}
            </div>
          </div>
          <div className="w-1/2 px-6 py-24 bg-gray-800 border-l-2 border-gray-500 border-opacity-30">
            {eyebrow && (
              <h4 className="uppercase text-sm mb-1 text-gray-50">{eyebrow}</h4>
            )}
            <div className="flex">
              <h3 className="font-bold text-xl text-gray-50">{title}</h3>
              <div className="uppercase text-xs text-gray-400 mt-2 ml-2">
                {name}
              </div>
            </div>
            <div className="flex">
              <p className="text-sm pt-3 text-left text-white text-opacity-50 leading-relaxed">
                {description}
              </p>
            </div>
            <div className="flex pt-4">
              <FundStatus amm={true} ver={true} fin={true} />
            </div>
            <div className="flex pt-4">
              <PerformanceHighlight
                amountSubtitle="LAST SALE PRICE"
                amount="6.2"
                performance="+100%"
              />
            </div>
            <div className="flex pt-6">
              <Button
                className="w-full text-center"
                size={Size.LARGE}
                kind={Kind.PRIMARY}
              >
                Invest in {title}
              </Button>
            </div>
          </div>
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

export default React.memo(DefaultVaultCard);
