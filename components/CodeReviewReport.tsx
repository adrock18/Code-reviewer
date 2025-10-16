
import React from 'react';
import type { CodeReview } from '../types';

interface CodeReviewReportProps {
  review: CodeReview;
}

const ReportIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

// This is a simple markdown-to-JSX parser. 
// A more robust solution would use a library like 'react-markdown'.
const SimpleMarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const lines = content.split('\n');
    const elements = lines.map((line, index) => {
        if (line.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-bold mt-6 mb-3 text-brand-secondary border-b-2 border-gray-700 pb-2">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
            return <h3 key={index} className="text-xl font-semibold mt-4 mb-2 text-text-primary">{line.substring(4)}</h3>;
        }
        if (line.startsWith('* ') || line.startsWith('- ')) {
            return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
        }
        if (line.startsWith('```')) {
            // This basic parser doesn't handle multi-line code blocks well.
            // It will treat each line of code as a paragraph inside a pre.
            return null; // For simplicity, we'll let the main component handle it.
        }
        return <p key={index} className="my-2">{line}</p>;
    });

    return <>{elements}</>;
};

export const CodeReviewReport: React.FC<CodeReviewReportProps> = ({ review }) => {
  return (
    <div className="bg-surface-dark rounded-lg shadow-2xl overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center">
            <ReportIcon />
            <h2 className="text-2xl font-bold text-text-primary">
              Code Review for <span className="text-brand-secondary font-mono">{review.fileName}</span>
            </h2>
        </div>
      </div>
      <div className="p-6 prose prose-invert prose-pre:bg-background-dark prose-pre:p-4 prose-pre:rounded-md max-w-none">
        {/* Using a simple pre-wrap for better code block handling than our simple parser */}
        <pre className="whitespace-pre-wrap font-sans text-text-primary text-base">
            <SimpleMarkdownRenderer content={review.report}/>
        </pre>
      </div>
    </div>
  );
};
