import React from 'react';
import type { AssetDetailProps } from '../types';
import Button, { Size, Kind } from '@/components/elements/Button';
import PerformanceHighlight from '@/components/modules/PerformanceHighlight';
import { Icons } from '@/components/elements/Icon';
import useMessage from '@/hooks/useMessage';

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
  fundSymbol,
  assetType,
  vaultId,
  openseaUrl,
}: AssetDetailProps) => {
  // @TODO make proper media adapter to handle image/video
  const isMp4 = image?.includes('.mp4');

  return (
    <div className={className}>
      <article className="text-gray-50 border-2 dark:border-gray-500 border-gray-100 dark:border-opacity-30 border-opacity-30 text-left break-words">
        <div className="flex flex-col md:flex-row w-full">
          <div
            className="md:w-1/2 p-6 md:p-9 lg:p-12 xl:p-24 flex justify-center items-center dark:bg-gray-700 bg-gray-50"
            style={{ backgroundColor: background }}
          >
            <div className="relative h-full">
              {placeholder}
              {image && !isMp4 && (
                <img
                  loading="lazy"
                  src={image}
                  alt={`${eyebrow} ${title}`}
                  className="w-full object-contain h-full"
                />
              )}
              {image && isMp4 && (
                <video
                  src={image}
                  autoPlay={true}
                  muted={true}
                  loop={true}
                  className="w-full object-contain h-full"
                />
              )}
            </div>
          </div>
          <div className="md:w-1/2 p-8 flex flex-col dark:bg-gray-800 bg-white md:border-l-2 dark:border-gray-500 border-gray-100 dark:border-opacity-30 border-opacity-30">
            {eyebrow && (
              <h4 className="uppercase text-md mb-1  dark:text-gray-50 text-gray-800">
                {eyebrow}
              </h4>
            )}
            <div className="flex flex-wrap items-baseline">
              <h3 className="font-bold text-3xl  dark:text-gray-50 text-gray-800 mr-2">
                {title}
              </h3>
              <div className="uppercase text-sm dark:text-gray-300 text-gray-600 mt-2">
                {assetType}
              </div>
            </div>
            <p className="text-md pt-3 text-left dark:text-white text-gray-800 text-opacity-75 leading-relaxed">
              {text}
            </p>
            <div className="py-8">
              <PerformanceHighlight
                amount={lastSalePrice}
                performance={performance}
              />
            </div>
            <div className="mt-auto flex flex-col xl:flex-row xl:space-x-3 space-y-2 xl:space-y-0">
              <Button
                className="w-full xl:w-1/2 text-center"
                size={Size.LARGE}
                kind={Kind.PRIMARY}
                href={`https://app.nftx.org/mint/${vaultId}`}
                target="_blank"
                icon={Icons.EXTERNAL_LINK}
              >
                {useMessage('asset.detail.mintRedeem', {
                  token: (
                    <span className="uppercase">
                      {'$'}
                      {fundSymbol}
                    </span>
                  ),
                })}
              </Button>
              <Button
                className="w-full xl:w-1/2 text-center flex items-center"
                size={Size.LARGE}
                kind={Kind.SECONDARY}
                // @TODO make this a util
                href={`${openseaUrl}?ref=0x40d73df4f99bae688ce3c23a01022224fe16c7b2`}
                target="_blank"
                icon={Icons.OPENSEA}
              >
                {useMessage('asset.detail.opensea.link')}
              </Button>
            </div>
            <div className="dark:text-gray-500 text-gray-600 text-xs mt-4">
              {useMessage('asset.detail.opensea.disclaimer')}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default React.memo(DefaultAssetDetail);
