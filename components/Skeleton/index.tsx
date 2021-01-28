import React from 'react';

export interface SkeletonCardProps {
  /**
   * Background color in hex format
   */
  background?: string;

  width?: number;

  height?: number;

  opacity?: number;
}

const SkeletonCard = ({
  background,
  height,
  width,
  opacity,
}: SkeletonCardProps) => {
  return (
    <div className="animate-pulse  flex space-x-4">
      <div
        className=" bg-lightest-gray shadow rounded-md p-4 max-w-sm w-full mx-auto"
        style={{
          background: background,
          width: width,
          height: height,
          opacity: opacity,
        }}
      ></div>
    </div>
  );
};

export default SkeletonCard;
