import React, { ReactNode } from 'react';

export interface VaultCardProps {
  /**
   * The image src to be rendered
   */
  image: string;
  /**
   * The text that appears above the title
   */
  eyebrow?: ReactNode;
  /**
   * The title of the card
   */
  title: ReactNode;
  /**
   * The text that appears beneath the title
   */
  text?: ReactNode;
  /**
   * Background color in hex format
   */
  background?: string;
  /**
   * Should it appear as a stack?
   */
  stack?: boolean;
}

const VaultCard = ({
  image,
  eyebrow,
  title,
  text,
  background,
  stack,
}: VaultCardProps) => {
  return (
    <div>
      <article className="text-gray-50 border-2 border-gray-500 border-opacity-30 text-left break-words">
        <div
          className="p-12 flex justify-center items-center bg-gray-700"
          style={{ backgroundColor: background }}
        >
          <img
            src={image}
            alt={`${eyebrow} ${title}`}
            className="w-full object-contain h-36"
          />
        </div>
        <div className="p-6 bg-gray-800 border-t-2 border-gray-500 border-opacity-30">
          {eyebrow && (
            <h4 className="uppercase text-sm mb-1 text-gray-50">{eyebrow}</h4>
          )}
          <h3 className="font-bold text-xl text-gray-50">{title}</h3>
          <p className="uppercase text-xs text-gray-400 mt-2">{text}</p>
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

export default VaultCard;
