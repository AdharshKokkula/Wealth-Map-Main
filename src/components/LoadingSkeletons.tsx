import { Skeleton } from "./ui/skeleton";

export const PropertyCardSkeleton = () => {
  return (
    <div className="p-4 border rounded-lg shadow-sm space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};

export const PropertyListSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
};