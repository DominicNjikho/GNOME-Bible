import type { ChapterResponse, Verse } from '../types';

const API_BASE_URL = 'https://bible-api.com';

export const fetchChapter = async (
    bookId: string, 
    chapter: number, 
    translationId: string,
    isAvailableOffline: boolean
): Promise<ChapterResponse> => {
  
  if (!navigator.onLine) {
    if (isAvailableOffline) {
        // In a real app, this would fetch from IndexedDB.
        // Here, we return a mock response to simulate offline access.
        console.log(`Serving ${bookId} ${chapter} (${translationId}) from offline storage.`);
        const mockVerse: Verse = { book_id: bookId, book_name: bookId, chapter, verse: 1, text: "This chapter was loaded from your device while offline." };
        const mockResponse: ChapterResponse = {
            reference: `${bookId} ${chapter}`,
            verses: [mockVerse],
            text: mockVerse.text,
            translation_id: translationId,
            translation_name: "Offline Version",
            translation_note: "This content is being served from local storage."
        };
        return mockResponse;
    } else {
        throw new Error("You are currently offline. Please connect to the internet or download this translation in the settings menu for offline access.");
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${bookId}+${chapter}?translation=${translationId}&verse_numbers=true`);
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Failed to fetch chapter. Status: ${response.status}.`;
      if (response.status === 404) {
          errorMessage = `Could not find ${bookId} chapter ${chapter} in the selected translation. Please try another selection.`
      } else if (errorText) {
          try {
             const errorJson = JSON.parse(errorText);
             if (errorJson.error) {
                errorMessage = errorJson.error;
             }
          } catch(e) {
             errorMessage += ` Response: ${errorText}`;
          }
      }
      throw new Error(errorMessage);
    }
    const data: ChapterResponse = await response.json();
    // In a real app, we would cache this response in IndexedDB here if the resource is marked for download.
    return data;
  } catch (error) {
    if (error instanceof Error) {
        throw new Error(`An error occurred while fetching Bible data: ${error.message}`);
    }
    throw new Error('An unknown error occurred while fetching Bible data.');
  }
};
