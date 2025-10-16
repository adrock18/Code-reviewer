
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FileUploader } from './components/FileUploader';
import { CodeReviewReport } from './components/CodeReviewReport';
import { Spinner } from './components/Spinner';
import { reviewCode } from './services/geminiService';
import type { CodeReview } from './types';

const App: React.FC = () => {
  const [review, setReview] = useState<CodeReview | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileAnalysis = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setReview(null);

    try {
      const fileContent = await file.text();
      const reviewText = await reviewCode(fileContent);
      setReview({
        fileName: file.name,
        report: reviewText,
      });
    } catch (err) {
      console.error('Error during code review:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = () => {
    setReview(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background-dark font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {!review && !isLoading && !error && (
             <FileUploader onFileSelect={handleFileAnalysis} disabled={isLoading} />
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-surface-dark rounded-lg shadow-xl">
              <Spinner />
              <p className="mt-4 text-lg text-text-secondary animate-pulse">
                Our AI assistant is reviewing your code...
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative" role="alert">
              <strong className="font-bold">An error occurred: </strong>
              <span className="block sm:inline">{error}</span>
              <button onClick={handleReset} className="mt-4 block w-full md:w-auto md:inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                Try Again
              </button>
            </div>
          )}

          {review && (
            <div>
              <CodeReviewReport review={review} />
              <div className="text-center mt-8">
                <button 
                  onClick={handleReset} 
                  className="bg-brand-secondary hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105 duration-300 shadow-lg">
                  Review Another File
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
