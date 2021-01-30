import React, { Suspense } from 'react';
import { Icons } from './constants';

const CheckCircle = React.lazy(() => import('./icons/CheckCircle'));
const XCircle = React.lazy(() => import('./icons/XCircle'));

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
}

const iconMap = {
  [Icons.checkCircle]: CheckCircle,
  [Icons.xCircle]: XCircle,
};

const Icon = ({ className, name }: IconProps) => {
  const IconComponent = iconMap[name] || 'span';

  const styles = `${className ?? ' h-6 w-6'}`;

  return (
    <Suspense fallback={null}>
      {React.createElement(IconComponent, { className: styles })}
    </Suspense>
  );
};
export default Icon;
