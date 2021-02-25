import React, { ReactNode } from 'react';
import { Colorway } from './constants';

export interface PosterProps {
  background?: CSSStyleDeclaration['background'];
  image?: string | URL;
  title?: ReactNode;
  text?: ReactNode;
  colorway?: Colorway;
}

const Poster = ({ background, image, title, text, colorway }: PosterProps) => {
  const color = colorway === Colorway.DARK ? 'text-gray-900' : 'text-gray-50';
  const gradient =
    colorway === Colorway.LIGHT
      ? 'rgba(0,0,0,0.3), rgba(0,0,0,0))'
      : 'rgba(255,255,255,.3), rgba(255,255,255,0))';
  const aspect = (27 / 21) * 100;

  return (
    <div
      className={`${color} rounded-md h-0 relative`}
      style={{
        background,
        backgroundImage: `linear-gradient(140deg, ${gradient}, url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'left bottom',
        backgroundRepeat: 'no-repeat',
        paddingTop: `${aspect}%`,
      }}
    >
      <div className="top-4 left-4 right-4 bottom-4 absolute overflow-hidden overflow-ellipsis">
        {title && <h3 className="font-bold text-xl leading-8 mb-1">{title}</h3>}
        {text && <h4 className="uppercase text-xs text-opacity-80">{text}</h4>}
      </div>
    </div>
  );
};

export default Poster;
