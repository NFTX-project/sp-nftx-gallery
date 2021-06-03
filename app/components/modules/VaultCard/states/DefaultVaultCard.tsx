import React from 'react';
import type { VaultCardProps } from '../types';

const DefaultVaultCard = ({
  image,
  imageSrcSet,
  imageAlt,
  eyebrow,
  title,
  text,
  background,
  stack,
  className,
  placeholder,
}: VaultCardProps) => {
  // @TODO make proper media adapter to handle image/video
  const isMp4 = image?.includes('.mp4');

  return (
    <div className={className || `h-full`}>
      <article className="h-full dark:bg-gray-800 bg-white shadow-nftx dark:shadow-none dark:text-gray-50 text-gray-800 border-1 dark:border-gray-500 border-gray-100 dark:border-opacity-30 border-opacity-30 text-left break-words">
        <div
          className="py-6 px-3 md:p-6 xl:p-9 flex justify-center items-center dark:bg-gray-700 bg-white"
          style={{ backgroundColor: background }}
        >
          <div className="relative h-36">
            {placeholder}
            {image && !isMp4 && (
              <img
                loading="lazy"
                srcSet={imageSrcSet}
                src={image}
                alt={`${imageAlt ?? eyebrow}`}
                className="w-full object-contain h-36"
              />
            )}
            {image && isMp4 && (
              <video
                src={image}
                className="w-full object-contain h-36"
                autoPlay={true}
                loop={true}
                muted={true}
              />
            )}
          </div>
        </div>
        <div className="p-6 dark:bg-gray-800 bg-white dark:border-t-2 dark:border-gray-500 border-gray-50 dark:border-opacity-30">
          {eyebrow && (
            <h4 className="uppercase text-sm mb-1 dark:text-gray-50 text-gray-800">
              {eyebrow}
            </h4>
          )}
          <h3 className="font-bold text-xl dark:text-gray-50 text-gray-800">
            {title}
          </h3>
          <div className="uppercase text-xs dark:text-gray-300 text-gray-600 mt-2">
            {text}
          </div>
        </div>
      </article>
      {stack && (
        <>
          <div className="dark:bg-gray-800 h-1 mx-1 border-l border-b border-r dark:border-gray-500 dark:border-opacity-30 bg-gray-100 border-gray-50 border-opacity-50" />
          <div className="dark:bg-gray-800 h-1 mx-2 border-l border-b border-r dark:border-gray-500 dark:border-opacity-30 bg-gray-100 border-gray-50 border-opacity-50" />
        </>
      )}
    </div>
  );
};

export default React.memo(DefaultVaultCard);
