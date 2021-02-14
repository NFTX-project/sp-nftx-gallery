import React from 'react';
import type { AssetDetailProps } from '../types';
import Button from '../../Button';
import PerformanceHighlight from '../../PerformanceHighlight';
import { Size, Kind } from '../../Button/constants';
import useMessage from '../../../hooks/message';
import { Icons } from '../../Icon';

const DefaultAssetDetail = ({
  image,
  eyebrow,
  title,
  text,
  background,
  className,
  placeholder,
  lastSalePrice,
  performance,
  fundName,
  assetType,
  vaultId,
}: AssetDetailProps) => {
  return (
    <div className={className}>
      <article className="text-gray-50 border-2 border-gray-500 border-opacity-30 text-left break-words">
        <div className="flex flex-col md:flex-row w-full">
          <div
            className="md:w-1/2 p-6 md:p-9 lg:p-12 xl:p-24 flex justify-center items-center bg-gray-700"
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
          <div className="md:w-1/2 p-8 flex flex-col bg-gray-800 md:border-l-2 border-gray-500 border-opacity-30">
            {eyebrow && (
              <h4 className="uppercase text-md mb-1 text-gray-50">{eyebrow}</h4>
            )}
            <div className="flex items-baseline">
              <h3 className="font-bold text-3xl text-gray-50">{title}</h3>
              <div className="uppercase text-sm text-gray-300 mt-2 ml-2">
                {assetType}
              </div>
            </div>
            <p className="text-md pt-3 text-left text-white text-opacity-75 leading-relaxed">
              {text}
            </p>
            <div className="py-8">
              <PerformanceHighlight
                amount={lastSalePrice}
                performance={performance}
              />
            </div>
            <div className="mt-auto">
              <Button
                className="w-full text-center"
                size={Size.LARGE}
                kind={Kind.PRIMARY}
                href={`https://nftx.org/#/fund/${vaultId}`}
                target="_blank"
                icon={Icons.EXTERNAL_LINK}
              >
                {useMessage('asset.detail.invest', {
                  fund: fundName,
                })}
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default React.memo(DefaultAssetDetail);
