import React from 'react';

export interface LightModeProps {
  /**
   * The size of the logo in pixels (1:1 ratio). Defaults to 32.
   */
  size?: number;
  className?: string;
}

/**
 * Reusable logo component that takes a size
 */
const LightMode = ({ size = 20, className, ...rest }: LightModeProps) => (
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
