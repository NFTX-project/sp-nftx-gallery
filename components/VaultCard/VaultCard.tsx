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
}

const VaultCard = ({
  image,
  eyebrow,
  title,
  text,
  background,
}: VaultCardProps) => {
  return (
    <article className="bg-gray text-gray-50 border-2 border-lightest-gray text-left break-words">
      <div
        className="p-12 flex justify-center items-center bg-light-gray"
        style={{ backgroundColor: background }}
      >
        <img
          src={image}
          alt={`${eyebrow} ${title}`}
          className="w-full object-contain h-36"
        />
      </div>
      <div className="p-6 border-t-2 border-lightest-gray">
        {eyebrow && (
          <h4 className="uppercase text-sm mb-1 text-off-white">{eyebrow}</h4>
        )}
        <h3 className="font-bold text-xl text-off-white">{title}</h3>
        <p className="uppercase text-xs text-gray-400 mt-2">{text}</p>
      </div>
    </article>
  );
};

export default VaultCard;
