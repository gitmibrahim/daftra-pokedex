import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div 
      className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
      data-testid="skeleton-card"
    >
      <div className="text-center">
        {/* Animated gradient background for sprite */}
        <div className="relative mx-auto w-32 h-32 mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full animate-pulse"></div>
          <div className="absolute inset-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-500 rounded-full animate-pulse delay-75"></div>
        </div>
        
        <div className="space-y-3">
          {/* ID placeholder */}
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full w-16 mx-auto animate-pulse"></div>
          
          {/* Name placeholder */}
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full w-24 mx-auto animate-pulse delay-100"></div>
          
          {/* Type badges placeholder */}
          <div className="flex justify-center space-x-2 mt-4">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full w-16 animate-pulse delay-200"></div>
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full w-14 animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
