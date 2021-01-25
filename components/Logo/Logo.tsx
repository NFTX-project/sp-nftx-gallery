import React from 'react';
import Image from 'next/image';

export interface LogoProps {
  /**
   * The size of the logo in pixels (1:1 ratio). Defaults to 32.
   */
  size?: number,
}

/**
 * Reusable logo component that takes a size prop
 */
const Logo = ({
  size = 32,
  ...rest
}: LogoProps) => (
  <Image
    src="/images/logo.png"
    alt="NFTX"
    height={size}
    width={size}
    {...rest}
  />
);

export default Logo;
