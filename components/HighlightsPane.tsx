import React, { useMemo, useState } from 'react';
import type { Highlight } from '../types';

interface HighlightsPaneProps {
  highlights: Highlight[];
  onRemoveHighlight: (id: string) => void;
  onNavigateToVerse: (highlight: Highlight) => void;
}

const HighlightsPane: React.FC<HighlightsPaneProps> = ({ highlights, onRemoveHighlight, onNavigateToVerse }) => {
  const [openTopic, setOpenTopic] = useState<string | null>(null);

  const groupedHighlights = useMemo(() => {
    const groups = highlights.reduce((acc, highlight) => {
      (acc[highlight.topic] = acc[highlight.topic] || []).push(highlight);
      return acc;
    }, {} as Record<string, Highlight[]>);
    // Set the first topic to be open by default if it's not already set
    if (openTopic === null && Object.keys(groups).length > 0) {
        setOpenTopic(Object.keys(groups)[0]);
    }
    return groups;
  }, [highlights, openTopic]);

  const toggleTopic = (topic: string) => {
    setOpenTopic(openTopic === topic ? null : topic);
  };

  return (
    <div className="p-4 h-full">
      <h2 className="text-xl font-semibold text-primary mb-3 border-b border-theme pb-2">
        Highlights & Notes
      </h2>
      {Object.keys(groupedHighlights).length === 0 ? (
        <p className="text-sm text-secondary italic mt-4">Select and highlight verses to save them here.</p>
      ) : (
        <div className="space-y-2">
          {Object.entries(groupedHighlights).map(([topic, topicHighlights]) => (
            <div key={topic} className="bg-secondary rounded-md border border-theme">
              <button
                onClick={() => toggleTopic(topic)}
                className="w-full flex justify-between items-center p-3 text-left font-semibold text-primary hover:bg-tertiary"
                aria-expanded={openTopic === topic}
              >
                <span>{topic}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${openTopic === topic ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {openTopic === topic && (
                <div className="border-t border-theme p-3 space-y-3">
                  {topicHighlights.map(highlight => (
                    <div key={highlight.id} className="group relative text-sm p-2 rounded-md hover:bg-tertiary">
                        <button
                          onClick={() => onNavigateToVerse(highlight)}
                          className="w-full text-left"
                        >
                            <p className="font-semibold text-link">{highlight.reference}</p>
                            <p className="text-secondary mt-1 italic">"{highlight.text.substring(0, 100)}..."</p>
                        </button>
                        <button
                            onClick={() => onRemoveHighlight(highlight.id)}
                            className="absolute top-1 right-1 p-1 rounded-full text-secondary bg-transparent hover:bg-danger hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove highlight"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HighlightsPane;
