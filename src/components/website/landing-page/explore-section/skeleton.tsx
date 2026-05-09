import { Skeleton } from "@/components/ui/skeleton";

export default function DestinationsSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="bg-[#F8EFD8] rounded-xl overflow-hidden grid w-full max-w-sm sm:max-w-none mx-auto h-full grid-rows-[auto_1fr]"
        >
          <Skeleton className="h-64 w-full" />
          <div className="grid gap-5 p-5 content-between">
            <div className="grid gap-3">
              <Skeleton className="h-7 w-3/4" />
              <div className="grid gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}
