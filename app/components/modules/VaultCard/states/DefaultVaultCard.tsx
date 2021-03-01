import React from 'react';
import type { VaultCardProps } from '../types';

const DefaultVaultCard = ({
  image,
  imageSrcSet,
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
      <article className="h-full bg-gray-800 text-gray-50 border-2 border-gray-500 border-opacity-30 text-left break-words">
        <div
          className="py-6 px-3 md:p-6 xl:p-9 flex justify-center items-center bg-gray-700"
          style={{ backgroundColor: background }}
        >
          <div className="relative h-36">
            {placeholder}
            {image && !isMp4 && (
              <img
                loading="lazy"
                srcSet={imageSrcSet}
                src={image}
                alt={`${eyebrow}`}
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
        <div className="p-6 bg-gray-800 border-t-2 border-gray-500 border-opacity-30">
          {eyebrow && (
            <h4 className="uppercase text-sm mb-1 text-gray-50">{eyebrow}</h4>
          )}
          <h3 className="font-bold text-xl text-gray-50">{title}</h3>
          <div className="uppercase text-xs text-gray-300 mt-2">{text}</div>
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
