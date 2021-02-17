import React from 'react';
import dynamic from 'next/dynamic';
import { Icons, Size } from './constants';

const CheckCircle = dynamic(() => import('./icons/CheckCircle'));
const XCircle = dynamic(() => import('./icons/XCircle'));
const ChevronRight = dynamic(() => import('./icons/ChevronRight'));
const ExternalLink = dynamic(() => import('./icons/ExternalLink'));
const Sparkle = dynamic(() => import('./icons/Sparkle'));
const OpenSea = dynamic(() => import('./icons/OpenSea'));

export interface IconProps {
  /**
   * The name of the icon to render
   * Must exist in `Icons` constant
   */
  name: Icons;
  /**
   * Any additional styling classes
   * If passed in they *must* set a height/width
   */
  className?: string;
  /**
   * Size
   */
  size?: Size;
}

const iconMap = {
  [Icons.CHECK_CIRCLE]: CheckCircle,
  [Icons.X_CIRCLE]: XCircle,
  [Icons.CHEVRON_RIGHT]: ChevronRight,
  [Icons.EXTERNAL_LINK]: ExternalLink,
  [Icons.SPARKLE]: Sparkle,
  [Icons.OPENSEA]: OpenSea,
};

const Icon = ({ className, name, size = Size.MEDIUM }: IconProps) => {
  const IconComponent = iconMap[name] || 'span';
  const hw = size === Size.SMALL ? 'h-4 w-4' : 'h-6 w-6';
  const styles = `${hw} ${className}`;

  return React.createElement(IconComponent, { className: styles });
};
export default Icon;
