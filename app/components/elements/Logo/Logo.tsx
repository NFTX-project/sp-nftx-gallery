import React from 'react';

export interface LogoProps {
  /**
   * The size of the logo in pixels (1:1 ratio). Defaults to 32.
   */
  size?: number;
  className?: string;
}

/**
 * Reusable logo component that takes a size
 */
const Logo = ({ size = 32, className, ...rest }: LogoProps) => (
  <img
    src="/images/logo_on_black.svg"
    alt="NFTX"
    height={size}
    width={size}
    className={`${className} inline-block`}
    {...rest}
  />
);

export default Logo;
