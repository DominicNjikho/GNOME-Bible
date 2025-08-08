import React, { useState, useEffect } from 'react';
import type { ChapterResponse, Highlight, Verse } from '../types';

interface ChapterViewProps {
  chapterData: ChapterResponse;
  highlights: Highlight[];
  onAddHighlight: (highlight: Omit<Highlight, 'id'>) => void;
  onSetActiveVerse: (verse: number | null) => void;
  displayMode: 'paragraph' | 'verse';
}

const ChapterView: React.FC<ChapterViewProps> = ({ chapterData, highlights, onAddHighlight, onSetActiveVerse, displayMode }) => {
  const [popup, setPopup] = useState<{
    visible: boolean;
    x: number;
    y: number;
    verse: Verse | null;
  }>({ visible: false, x: 0, y: 0, verse: null });

  const highlightedVerses = new Set(
    highlights
      .filter(h => h.bookId === chapterData.verses[0]?.book_id && h.chapter === chapterData.verses[0]?.chapter)
      .map(h => h.verse)
  );
  
  const handleMouseUp = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== '') {
      const target = e.target as HTMLElement;
      const verseSpan = target.closest('.verse-text');
      if (verseSpan) {
        const verseNumber = parseInt(verseSpan.getAttribute('data-verse') || '0', 10);
        const verseData = chapterData.verses.find(v => v.verse === verseNumber);
        if (verseData) {
            const rect = selection.getRangeAt(0).getBoundingClientRect();
            setPopup({
                visible: true,
                x: e.clientX,
                y: e.clientY,
                verse: verseData,
            });
            return;
        }
      }
    }
    setPopup({ visible: false, x: 0, y: 0, verse: null });
  };
  
  useEffect(() => {
    const closePopup = () => setPopup({ visible: false, x: 0, y: 0, verse: null });
    document.addEventListener('mousedown', closePopup);
    return () => document.removeEventListener('mousedown', closePopup);
  }, []);

  const handleHighlightClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the document mousedown listener from firing
    if (popup.verse) {
      const topic = prompt('Enter a topic for this highlight:', 'General');
      if (topic) {
        onAddHighlight({
          bookId: popup.verse.book_id,
          chapter: popup.verse.chapter,
          verse: popup.verse.verse,
          text: popup.verse.text,
          topic: topic,
          reference: `${popup.verse.book_name} ${popup.verse.chapter}:${popup.verse.verse}`,
        });
      }
    }
    setPopup({ visible: false, x: 0, y: 0, verse: null });
  };

  return (
    <article className="prose prose-lg max-w-none" onMouseUp={handleMouseUp}>
      <h2 className="text-3xl font-bold border-b border-theme pb-3 mb-6">
        {chapterData.reference}
      </h2>
      <div className={`leading-relaxed ${displayMode === 'paragraph' ? 'text-justify' : ''}`}>
        {chapterData.verses.map((verse) => {
          const VerseComponent = displayMode === 'verse' ? 'div' : 'span';
          const verseClasses = `verse-text ${highlightedVerses.has(verse.verse) ? 'highlighted' : ''} ${displayMode === 'paragraph' ? 'mr-2' : 'mb-3'}`;
          
          return (
            <VerseComponent
              key={verse.verse}
              id={`verse-${verse.book_id}-${verse.chapter}-${verse.verse}`}
              data-verse={verse.verse}
              className={verseClasses}
            >
              <sup
                className="font-semibold mr-1 cursor-pointer hover:underline"
                onClick={(e) => { e.stopPropagation(); onSetActiveVerse(verse.verse); }}
                title={`Get commentary for verse ${verse.verse}`}
              >
                {verse.verse}
              </sup>
              {verse.text.trim()}
            </VerseComponent>
          );
        })}
      </div>
       {popup.visible && (
        <div 
            onMouseDown={(e) => e.stopPropagation()} // Prevent closing when clicking inside popup
            className="absolute bg-secondary border border-theme rounded-md shadow-lg p-2"
            style={{ top: `${popup.y}px`, left: `${popup.x}px` }}
        >
          <button onClick={handleHighlightClick} className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            Highlight
          </button>
        </div>
      )}
      <footer className="mt-10 pt-4 border-t border-theme text-sm">
        <p><strong>{chapterData.translation_name}</strong> ({chapterData.translation_id.toUpperCase()})</p>
        {chapterData.translation_note && <p className="mt-1 italic">{chapterData.translation_note}</p>}
      </footer>
    </article>
  );
};

export default ChapterView;