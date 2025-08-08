import React, { useState, useEffect } from 'react';
import type { Book, CommentarySource } from '../types';
import { fetchCommentary } from '../services/geminiService';
import Spinner from './Spinner';

interface CommentaryProps {
  book: Book | undefined;
  chapter: number;
  verse: number | null;
  source: CommentarySource;
  onSourceChange: (source: CommentarySource) => void;
  isJfbDownloaded: boolean;
}

const Commentary: React.FC<CommentaryProps> = ({ book, chapter, verse, source, onSourceChange, isJfbDownloaded }) => {
  const [commentary, setCommentary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!book || source === 'jfb') {
      setCommentary('');
      setError(null);
      setIsLoading(false);
      return;
    };

    const reference = verse ? `${book.name} ${chapter}:${verse}` : `${book.name} ${chapter}`;

    const getCommentary = async () => {
      setIsLoading(true);
      setError(null);
      setCommentary('');
      try {
        const text = await fetchCommentary(reference);
        setCommentary(text);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred while fetching commentary.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    const timerId = setTimeout(getCommentary, 500);
    return () => clearTimeout(timerId);

  }, [book, chapter, verse, source]);

  const referenceText = verse ? `${book?.name} ${chapter}:${verse}` : `${book?.name} ${chapter}`;

  const renderContent = () => {
    if (source === 'jfb') {
      return (
        <div className="text-sm text-secondary leading-relaxed">
          <p>This is placeholder text for the JFB Commentary on <span className="font-semibold">{referenceText}</span>.</p>
          <p className="mt-2 italic">In a fully implemented version, the complete commentary downloaded for offline use would be displayed here.</p>
        </div>
      )
    }

    if (isLoading) return <Spinner />;
    if (error) return <p className="text-sm text-danger bg-danger p-3 rounded">{error}</p>;
    
    if (commentary) {
      return (
        <div className="text-sm text-secondary leading-relaxed whitespace-pre-wrap">
          {commentary}
        </div>
      );
    }
    
    return (
        <p className="text-sm text-secondary italic">No commentary available. Click a verse number to generate specific notes.</p>
    );
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="border-b border-theme pb-2 mb-3">
        <h3 className="text-lg font-semibold text-primary mb-2">
            Commentary on <span className="text-link">{referenceText}</span>
        </h3>
        <div className="flex items-center justify-center bg-tertiary p-1 rounded-lg">
            <button
                onClick={() => onSourceChange('ai')}
                className={`px-3 py-1 text-sm rounded-md w-1/2 transition-colors ${source === 'ai' ? 'bg-secondary shadow' : 'text-secondary'}`}
            >
                AI (Online)
            </button>
            <button
                onClick={() => onSourceChange('jfb')}
                disabled={!isJfbDownloaded}
                className={`px-3 py-1 text-sm rounded-md w-1/2 transition-colors ${source === 'jfb' ? 'bg-secondary shadow' : 'text-secondary'} disabled:opacity-50 disabled:cursor-not-allowed`}
                title={isJfbDownloaded ? "Jamieson-Fausset-Brown Commentary" : "Download JFB Commentary in Settings to enable"}
            >
                JFB (Offline)
            </button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Commentary;
