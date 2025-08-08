import { useState, useEffect, useCallback } from 'react';
import type { Highlight } from '../types';

const useHighlights = () => {
  const [highlights, setHighlights] = useState<Highlight[]>(() => {
    try {
      const item = window.localStorage.getItem('bible-highlights');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error('Error reading highlights from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('bible-highlights', JSON.stringify(highlights));
    } catch (error) {
      console.error('Error saving highlights to localStorage', error);
    }
  }, [highlights]);

  const addHighlight = useCallback((highlight: Omit<Highlight, 'id'>) => {
    const newHighlight: Highlight = { ...highlight, id: crypto.randomUUID() };
    setHighlights(prevHighlights => [...prevHighlights, newHighlight]);
  }, []);

  const removeHighlight = useCallback((id: string) => {
    setHighlights(prevHighlights => prevHighlights.filter(h => h.id !== id));
  }, []);

  return { highlights, addHighlight, removeHighlight };
};

export default useHighlights;
