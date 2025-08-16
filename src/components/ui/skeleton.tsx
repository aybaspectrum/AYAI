"use client";

import { cn } from "~/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]",
        className
      )}
      style={{
        animation: "shimmer 2s infinite",
      }}
      {...props}
    />
  );
}

// Card skeleton for dashboard
function CardSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

// Timeline skeleton
function TimelineSkeleton() {
  return (
    <div className="space-y-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex space-x-4">
          <div className="flex flex-col items-center">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-20 w-0.5" />
          </div>
          <div className="flex-1 space-y-3">
            <Skeleton className="h-6 w-1/4" />
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Form skeleton
function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-24 w-full" />
      </div>
      <div className="flex space-x-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  );
}

export { Skeleton, CardSkeleton, TimelineSkeleton, FormSkeleton };
