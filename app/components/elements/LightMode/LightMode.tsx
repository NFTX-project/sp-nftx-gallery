import React from 'react';

export interface LightModeProps {
  /**
   * The size of the Light Mode in pixels (1:1 ratio). Defaults to 18.
   */
  size?: number;
  className?: string;
}

/**
 * Reusable LightMode component that takes a size
 */
const LightMode = ({ size = 18, className, ...rest }: LightModeProps) => (
  <>
    <img
      src="/images/lightmode_on_black.svg"
      alt="LightMode Light"
      height={size}
      width={size}
      className={`${className} hidden dark:inline-block`}
      {...rest}
    />
    <img
      src="/images/lightmode_on_white.svg"
      alt="LightMode Dark"
      height={size}
      width={size}
      className={`${className} dark:hidden inline-block`}
      {...rest}
    />
  </>
);

export default LightMode;
