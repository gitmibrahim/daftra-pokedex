import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from './LoadingSpinner';

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onLoadMore,
  hasMore,
  isLoading,
}) => {
  if (!hasMore && !isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400" data-testid="text-no-more-pokemon">
          No more Pokémon to load
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <Button
        onClick={onLoadMore}
        disabled={isLoading || !hasMore}
        className="group px-8 py-4 bg-pokemon-blue hover:bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3"
        data-testid="button-load-more"
      >
        <span>{isLoading ? 'Loading...' : 'Load More Pokémon'}</span>
        {isLoading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        )}
      </Button>
    </div>
  );
};
