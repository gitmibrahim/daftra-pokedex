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
      <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center space-y-4">
            {/* Logo and Title - Centered */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pokemon-red to-pokemon-blue rounded-full flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight" data-testid="text-app-title">
                  ⚡ Pokédex
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Discover and explore Pokémon with page controls
                </p>
              </div>
            </div>
            
            {/* Navigation Tabs - Centered */}
            <nav className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1" data-testid="nav-view-tabs">
              <button
                onClick={() => onViewChange('pagination')}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 text-sm ${
                  currentView === 'pagination'
                    ? 'bg-white dark:bg-gray-800 text-pokemon-blue shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
                data-testid="button-pagination-view"
              >
                Page Controls
              </button>
              <button
                onClick={() => onViewChange('infinitescroll')}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 text-sm ${
                  currentView === 'infinitescroll'
                    ? 'bg-white dark:bg-gray-800 text-pokemon-blue shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
                data-testid="button-infinitescroll-view"
              >
                Infinite Scroll
              </button>
            </nav>
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
