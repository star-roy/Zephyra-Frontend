import React from 'react';

const Skeleton = ({ 
  width = '100%', 
  height = '20px', 
  className = '', 
  rounded = 'rounded-md' 
}) => {
  return (
    <div 
      className={`bg-gray-200 animate-pulse ${rounded} ${className}`}
      style={{ width, height }}
    >
      <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
    </div>
  );
};

export const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow border border-gray-100 p-6 space-y-4">
    <Skeleton height="24px" width="60%" />
    <Skeleton height="16px" width="80%" />
    <Skeleton height="16px" width="70%" />
    <div className="flex justify-between items-center pt-2">
      <Skeleton height="32px" width="80px" rounded="rounded-full" />
      <Skeleton height="32px" width="80px" rounded="rounded-full" />
    </div>
  </div>
);

export const SkeletonStatCard = () => (
  <div className="bg-white rounded-xl shadow border border-gray-100 p-4 sm:p-6 flex flex-col items-center justify-center">
    <Skeleton height="32px" width="60px" className="mb-2" />
    <Skeleton height="14px" width="80px" />
  </div>
);

export const SkeletonProfile = () => (
  <div className="space-y-6">
    <div className="relative">
      <Skeleton height="160px" width="100%" rounded="rounded-2xl" />
      <div className="absolute left-1/2 top-32 transform -translate-x-1/2 -translate-y-1/2">
        <Skeleton height="96px" width="96px" rounded="rounded-full" />
      </div>
    </div>
    
    <div className="flex flex-col items-center mt-8 space-y-3">
      <Skeleton height="28px" width="200px" />
      <Skeleton height="16px" width="120px" />
      <Skeleton height="40px" width="120px" rounded="rounded-full" />
    </div>
  </div>
);

export default Skeleton;
