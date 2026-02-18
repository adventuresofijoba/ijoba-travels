import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import React from "react";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  currentPage = 1,
  totalPages = 5,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mt-10 sm:mt-16">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-full flex items-center justify-center border border-[#2D2D2D]/20 text-[#2D2D2D] hover:bg-[#2D2D2D]/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Previous page"
      >
        <Icon icon="mingcute:arrow-left-line" width="20" height="20" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-2">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          
          return (
            <button
              key={page}
              onClick={() => onPageChange?.(page)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-medium transition-all",
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-[#2D2D2D]/70 hover:bg-[#2D2D2D]/5"
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-full flex items-center justify-center border border-[#2D2D2D]/20 text-[#2D2D2D] hover:bg-[#2D2D2D]/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Next page"
      >
        <Icon icon="mingcute:arrow-right-line" width="20" height="20" />
      </button>
    </div>
  );
}
