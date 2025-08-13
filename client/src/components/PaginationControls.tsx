import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaginationInfo } from '../types/pokemon';

interface PaginationControlsProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  pagination,
  onPageChange,
  isLoading = false,
}) => {
  const { currentPage, totalPages, totalCount } = pagination;
  
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const startItem = (currentPage - 1) * 20 + 1;
  const endItem = Math.min(currentPage * 20, totalCount);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
      <div 
        className="text-sm text-gray-600 dark:text-gray-400"
        data-testid="text-pagination-info"
      >
        Showing <span className="font-medium text-gray-900 dark:text-white">{startItem}</span> to{' '}
        <span className="font-medium text-gray-900 dark:text-white">{endItem}</span> of{' '}
        <span className="font-medium text-gray-900 dark:text-white">{totalCount}</span> results
      </div>
      
      <nav className="flex items-center space-x-1" data-testid="nav-pagination">
        {/* Previous Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="px-3 py-2"
          data-testid="button-previous-page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {/* Page Numbers */}
        {generatePageNumbers().map((page, index) => 
          page === '...' ? (
            <span key={index} className="px-2 py-2 text-gray-500" data-testid="text-pagination-ellipsis">
              ...
            </span>
          ) : (
            <Button
              key={index}
              variant={currentPage === page ? "default" : "ghost"}
              size="sm"
              onClick={() => onPageChange(page as number)}
              disabled={isLoading}
              className={
                currentPage === page
                  ? "px-4 py-2 bg-pokemon-blue hover:bg-blue-600 text-white"
                  : "px-4 py-2"
              }
              data-testid={`button-page-${page}`}
            >
              {page}
            </Button>
          )
        )}
        
        {/* Next Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className="px-3 py-2"
          data-testid="button-next-page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
};
