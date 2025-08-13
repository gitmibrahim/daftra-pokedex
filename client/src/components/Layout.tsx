import React from 'react';
import { ViewMode } from '../types/pokemon';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Navigation Header */}
      <header className="bg-white dark:bg-slate-800 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-pokemon-red rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">🐉</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="text-app-title">
                Pokédex
              </h1>
            </div>
            
            {/* Navigation Tabs */}
            <nav className="hidden md:flex space-x-1" data-testid="nav-view-tabs">
              <button
                onClick={() => onViewChange('pagination')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'pagination'
                    ? 'bg-pokemon-blue text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                data-testid="button-pagination-view"
              >
                Pagination
              </button>
              <button
                onClick={() => onViewChange('loadmore')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'loadmore'
                    ? 'bg-pokemon-blue text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                data-testid="button-loadmore-view"
              >
                Load More
              </button>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              data-testid="button-mobile-menu"
            >
              <span className="text-xl text-gray-600 dark:text-gray-300">☰</span>
            </button>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden mt-4 flex space-x-2">
            <button
              onClick={() => onViewChange('pagination')}
              className={`flex-1 py-2 rounded-lg font-medium ${
                currentView === 'pagination'
                  ? 'bg-pokemon-blue text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              data-testid="button-mobile-pagination"
            >
              Pagination
            </button>
            <button
              onClick={() => onViewChange('loadmore')}
              className={`flex-1 py-2 rounded-lg font-medium ${
                currentView === 'loadmore'
                  ? 'bg-pokemon-blue text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              data-testid="button-mobile-loadmore"
            >
              Load More
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};
