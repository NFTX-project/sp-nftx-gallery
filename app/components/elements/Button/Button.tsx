import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import Icon, { Icons, Size as IconSize } from '@/components/elements/Icon';
import { Kind, Size } from './constants';

export interface ButtonProps
  extends Partial<ButtonHTMLAttributes<any>>,
    Record<string, any> {
  /**
   * The Kind of Button
   */
  kind?: Kind;
  /**
   * Link, sir? Some buttons are actually <a>s
   */
  href?: string;
  /**
   * What Size?
   */
  size?: Size;
  /**
   * Needed when being wrapped by a `<Link>`
   */
  ref: string;
  /**
   * Icon
   * An icon to place within the button
   */
  icon: Icons;
}

const baseStyles = `inline-flex items-center justify-center outline-none font-medium rounded-md break-word hover:outline focus:outline-none focus:ring-2 focus:ring-opacity-75`;
const kindStyles = {
  [Kind.PRIMARY]:
    'bg-gradient-to-b from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-500 focus:ring-pink-500',
  [Kind.SECONDARY]:
    'dark:bg-white dark:border-none border border-pink-500 text-gray-900 hover:bg-gray-100 focus:ring-gray-300',
  [Kind.ICON]:
    'bg-gradient-to-b from-orange-500 via-red-500 to-orange-500 text-white hover:from-orange-500 hover:to-orange-500 focus:ring-red-600',
  [Kind.OUTLINE]:
    'bg-transparent border border-pink-500 text-white hover:bg-pink-500 hover:bg-opacity-10 focus:ring-pink-700',
  [Kind.INVERT]:
    'bg-transparent text-white border border-transparent hover:border-opacity-50 hover:border-pink-500 focus:ring-pink-700',
};
const sizeStyles = {
  [Size.SMALL]: `py-2 px-3 min-h-100 h-10 text-sm`,
  [Size.MEDIUM]: `py-3 px-4 min-h-100 h-12`,
  [Size.LARGE]: `py-6 px-12 min-h-100 h-18`,
};

const iconSizeMap = {
  [Size.SMALL]: IconSize.SMALL,
  [Size.MEDIUM]: IconSize.SMALL,
  [Size.LARGE]: IconSize.MEDIUM,
};

const Button = forwardRef(
  (
    {
      href,
      children,
      className,
      size = Size.MEDIUM,
      kind = Kind.PRIMARY,
      icon,
      ...rest
    }: ButtonProps,
    ref
  ) => {
    const Element = href ? 'a' : 'button';

    const styles = `${baseStyles} ${sizeStyles[size]} ${kindStyles[kind]} ${
      className ?? ''
    }`;

    return (
      <Element ref={ref} href={href} className={styles} {...rest}>
        <span className="w-auto">{children}</span>
        {icon && (
          <span className="ml-2 text-center">
            <Icon name={icon} size={iconSizeMap[size]} />
          </span>
        )}
      </Element>
    );
  }
);

Button.displayName = 'Button';

export default Button;
