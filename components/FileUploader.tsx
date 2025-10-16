
import React, { useState, useCallback, useRef } from 'react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  disabled: boolean;
}

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelect(event.target.files[0]);
    }
  };
  
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  }

  return (
    <div className="w-full text-center">
        <h2 className="text-3xl font-bold mb-2">Get Started</h2>
        <p className="text-text-secondary mb-8">Upload a source code file to begin the AI-powered review.</p>
        <div
            className={`relative block w-full rounded-lg border-2 border-dashed ${isDragging ? 'border-brand-secondary bg-surface-dark' : 'border-gray-600'} p-12 text-center transition-colors duration-300 ${disabled ? 'opacity-50' : 'hover:border-gray-500 cursor-pointer'}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={openFileDialog}
        >
            <UploadIcon />
            <span className="mt-2 block font-semibold text-text-primary">
                Drag & drop a file here
            </span>
            <span className="text-text-secondary">or click to select a file</span>
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                disabled={disabled}
                accept=".js,.jsx,.ts,.tsx,.py,.java,.go,.rs,.cs,.html,.css,.scss,.rb,.php,.c,.cpp,.h,.hpp"
            />
        </div>
    </div>
  );
};
