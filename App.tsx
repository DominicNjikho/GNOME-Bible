import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { ChapterResponse, Book, Highlight, CommentarySource } from './types';
import { BIBLE_BOOKS, TRANSLATIONS } from './constants';
import { fetchChapter } from './services/bibleService';
import Header from './components/Header';
import Spinner from './components/Spinner';
import ChapterView from './components/ChapterView';
import Commentary from './components/Commentary';
import HighlightsPane from './components/HighlightsPane';
import SettingsPanel from './components/SettingsPanel';
import useHighlights from './hooks/useHighlights';
import useSettings from './hooks/useSettings';
import useOfflineManager from './hooks/useOfflineManager';


const App: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [selectedTranslation, setSelectedTranslation] = useState<string>(TRANSLATIONS[0].id);
  const [selectedBook, setSelectedBook] = useState<string>(BIBLE_BOOKS[0].id);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [activeVerse, setActiveVerse] = useState<number | null>(null);
  const [commentarySource, setCommentarySource] = useState<CommentarySource>('ai');

  const [chapterData, setChapterData] = useState<ChapterResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { highlights, addHighlight, removeHighlight } = useHighlights();
  const offlineManager = useOfflineManager();
  const isJfbDownloaded = useMemo(() => offlineManager.statuses['jfb'] === 'downloaded', [offlineManager.statuses]);

  const currentBook: Book | undefined = useMemo(() => 
    BIBLE_BOOKS.find(b => b.id === selectedBook), 
    [selectedBook]
  );

  const chapterOptions = useMemo(() => {
    if (!currentBook) return [];
    return Array.from({ length: currentBook.chapters }, (_, i) => i + 1);
  }, [currentBook]);

  const loadChapter = useCallback(async (book: string, chapter: number, translation: string) => {
    setIsLoading(true);
    setError(null);
    setActiveVerse(null);
    try {
      const isAvailableOffline = offlineManager.statuses[translation] === 'downloaded';
      const data = await fetchChapter(book, chapter, translation, isAvailableOffline);
      setChapterData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
      setChapterData(null);
    } finally {
      setIsLoading(false);
    }
  }, [offlineManager.statuses]);

  useEffect(() => {
    loadChapter(selectedBook, selectedChapter, selectedTranslation);
  }, [selectedBook, selectedChapter, selectedTranslation, loadChapter]);
  
  useEffect(() => {
    if (!isJfbDownloaded && commentarySource === 'jfb') {
      setCommentarySource('ai');
    }
  }, [isJfbDownloaded, commentarySource])


  const handleBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBookId = e.target.value;
    setSelectedBook(newBookId);
    setSelectedChapter(1);
  };

  const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChapter(Number(e.target.value));
  };
  
  const handleTranslationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTranslation(e.target.value);
  };

  const navigateToVerse = (highlight: Highlight) => {
    if (selectedBook !== highlight.bookId || selectedChapter !== highlight.chapter) {
      setSelectedBook(highlight.bookId);
      setSelectedChapter(highlight.chapter);
    }
    setActiveVerse(highlight.verse);
     setTimeout(() => {
      const verseElement = document.getElementById(`verse-${highlight.bookId}-${highlight.chapter}-${highlight.verse}`);
      verseElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div className="flex flex-col h-screen font-sans">
      <Header 
        selectedTranslation={selectedTranslation} 
        onTranslationChange={handleTranslationChange}
        onToggleSettings={() => setIsSettingsOpen(true)}
      />
       <SettingsPanel 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        updateSettings={updateSettings}
        offlineManager={offlineManager}
      />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar for Navigation & Commentary */}
        <aside className="w-96 bg-tertiary border-r border-theme flex flex-col shrink-0">
          <div className="p-4 space-y-4">
            <div>
              <label htmlFor="book" className="block mb-1 text-sm font-medium text-secondary">Book</label>
              <select
                id="book"
                value={selectedBook}
                onChange={handleBookChange}
                className="bg-secondary border border-theme text-primary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                {BIBLE_BOOKS.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="chapter" className="block mb-1 text-sm font-medium text-secondary">Chapter</label>
              <select
                id="chapter"
                value={selectedChapter}
                onChange={handleChapterChange}
                className="bg-secondary border border-theme text-primary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                disabled={!currentBook}
              >
                {chapterOptions.map((chapterNum) => (
                  <option key={chapterNum} value={chapterNum}>
                    {chapterNum}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto border-t border-theme">
              <Commentary 
                book={currentBook} 
                chapter={selectedChapter} 
                verse={activeVerse}
                source={commentarySource}
                onSourceChange={setCommentarySource}
                isJfbDownloaded={isJfbDownloaded}
              />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-secondary">
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">
            {isLoading ? (
              <Spinner />
            ) : error ? (
              <div className="text-center text-danger bg-danger p-6 rounded-lg border border-red-200">
                <h3 className="font-bold text-lg">Error Loading Chapter</h3>
                <p className="mt-2">{error}</p>
              </div>
            ) : chapterData ? (
              <ChapterView 
                chapterData={chapterData}
                highlights={highlights}
                onAddHighlight={addHighlight}
                onSetActiveVerse={setActiveVerse}
                displayMode={settings.displayMode}
              />
            ) : (
               <div className="text-center text-secondary mt-20">
                  <p>Select a book and chapter to begin reading.</p>
               </div>
            )}
          </div>
        </main>
        
        {/* Right Sidebar for Highlights */}
        <aside className="w-96 bg-tertiary border-l border-theme overflow-y-auto shrink-0 hidden lg:block">
            <HighlightsPane 
                highlights={highlights} 
                onRemoveHighlight={removeHighlight}
                onNavigateToVerse={navigateToVerse}
            />
        </aside>
      </div>
    </div>
  );
};

export default App;
