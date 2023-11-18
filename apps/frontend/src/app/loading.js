import { Skeleton } from "ui";

export default function Loading() {
  return (
    <div className="flex flex-col items-center ">
      <div className="space-y-2">
        <Skeleton className="h-12 w-80" />
      </div>
      <div className="space-y-2 mt-40">
        <Skeleton className="h-10 w-80 lg:w-[500px]" />
        <Skeleton className="h-10 w-80 lg:w-[500px]" />
        <Skeleton className="h-10 w-80 lg:w-[500px]" />
        <Skeleton className="h-10 w-80 lg:w-[500px]" />
        <Skeleton className="h-10 w-80 lg:w-[500px]" />
        <Skeleton className="h-10 w-80 lg:w-[500px]" />
      </div>
    </div>
  );
}
