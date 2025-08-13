import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div 
      className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
      data-testid="skeleton-card"
    >
      <div className="text-center animate-pulse">
        <div className="mx-auto w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto"></div>
          <div className="flex justify-center space-x-2 mt-3">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
