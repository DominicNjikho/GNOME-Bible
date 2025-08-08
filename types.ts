export interface Verse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface ChapterResponse {
  reference: string;
  verses: Verse[];
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note: string;
}

export interface Translation {
  id: string;
  name: string;
}

export interface Book {
  id: string;
  name: string;
  chapters: number;
}

export interface Highlight {
  id: string;
  bookId: string;
  chapter: number;
  verse: number;
  text: string;
  topic: string;
  reference: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  highlightColor: string;
  displayMode: 'paragraph' | 'verse';
}

export type DownloadStatus = 'not-downloaded' | 'downloading' | 'downloaded' | 'error';

export interface OfflineResource {
    id: string;
    name: string;
    type: 'translation' | 'commentary';
    size: string; // e.g., "15 MB"
}

export type CommentarySource = 'ai' | 'jfb';
