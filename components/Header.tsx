
import React from 'react';

const CodeIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-surface-dark/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <CodeIcon />
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
            Code Review Assistant
          </h1>
        </div>
        <p className="text-text-secondary mt-1">
          Automated code analysis
        </p>
      </div>
    </header>
  );
};
