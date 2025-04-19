
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  maxButtons?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  maxButtons = 5,
}: PaginationProps) {
  // Always show first page, last page, current page, and pages adjacent to current
  const generatePageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    
    if (totalPages <= maxButtons) {
      // If there aren't many pages, just show all of them
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate range around current page
      const rangeStart = Math.max(2, currentPage - 1);
      const rangeEnd = Math.min(totalPages - 1, currentPage + 1);
      
      // Add ellipsis if needed before range
      if (rangeStart > 2) {
        pages.push('ellipsis');
      }
      
      // Add pages in range
      for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed after range
      if (rangeEnd < totalPages - 1) {
        pages.push('ellipsis');
      }
      
      // Always include last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };
  
  const pageNumbers = generatePageNumbers();

  return (
    <div className={cn("flex items-center justify-center space-x-2", className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
      
      {pageNumbers.map((page, index) => (
        page === 'ellipsis' ? (
          <div 
            key={`ellipsis-${index}`}
            className="flex items-center justify-center h-9 w-9"
          >
            <MoreHorizontal className="h-4 w-4" />
          </div>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(page)}
            className="h-9 w-9"
          >
            {page}
          </Button>
        )
      ))}
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  );
}
