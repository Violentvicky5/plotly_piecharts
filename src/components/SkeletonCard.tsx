import React from "react";

const SkeletonLine = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-200 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
  </div>
);

const SkeletonCard = () => {
  return (
    <div className="space-y-3">
      <SkeletonLine className="h-4 w-1/3" />
      <SkeletonLine className="h-40 w-full rounded-lg" />
      <SkeletonLine className="h-4 w-2/3" />
    </div>
  );
};

export default SkeletonCard;
