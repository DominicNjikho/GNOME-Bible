import type { Translation, Book, OfflineResource } from './types';

export const TRANSLATIONS: Translation[] = [
  { id: 'kjv', name: 'King James Version' },
  { id: 'web', name: 'World English Bible' },
  { id: 'bbe', name: 'Bible in Basic English' },
];

export const FONT_OPTIONS = [
    { value: "'Inter', sans-serif", label: 'Inter' },
    { value: "'Georgia', serif", label: 'Georgia' },
    { value: "'Lato', sans-serif", label: 'Lato' },
    { value: "'Roboto Slab', serif", label: 'Roboto Slab' },
];

export const HIGHLIGHT_COLORS = [
    '#fef9c3', // yellow-100
    '#dbeafe', // blue-100
    '#dcfce7', // green-100
    '#fee2e2', // red-100
    '#f3e8ff', // purple-100
];

export const OFFLINE_RESOURCES: OfflineResource[] = [
    { id: 'kjv', name: 'King James Version', type: 'translation', size: '4.2 MB' },
    { id: 'web', name: 'World English Bible', type: 'translation', size: '4.5 MB' },
    { id: 'jfb', name: 'JFB Commentary', type: 'commentary', size: '10.1 MB' },
];

export const BIBLE_BOOKS: Book[] = [
  { id: 'Gen', name: 'Genesis', chapters: 50 },
  { id: 'Exod', name: 'Exodus', chapters: 40 },
  { id: 'Lev', name: 'Leviticus', chapters: 27 },
  { id: 'Num', name: 'Numbers', chapters: 36 },
  { id: 'Deut', name: 'Deuteronomy', chapters: 34 },
  { id: 'Josh', name: 'Joshua', chapters: 24 },
  { id: 'Judg', name: 'Judges', chapters: 21 },
  { id: 'Ruth', name: 'Ruth', chapters: 4 },
  { id: '1Sam', name: '1 Samuel', chapters: 31 },
  { id: '2Sam', name: '2 Samuel', chapters: 24 },
  { id: '1Kgs', name: '1 Kings', chapters: 22 },
  { id: '2Kgs', name: '2 Kings', chapters: 25 },
  { id: '1Chr', name: '1 Chronicles', chapters: 29 },
  { id: '2Chr', name: '2 Chronicles', chapters: 36 },
  { id: 'Ezra', name: 'Ezra', chapters: 10 },
  { id: 'Neh', name: 'Nehemiah', chapters: 13 },
  { id: 'Esth', name: 'Esther', chapters: 10 },
  { id: 'Job', name: 'Job', chapters: 42 },
  { id: 'Ps', name: 'Psalms', chapters: 150 },
  { id: 'Prov', name: 'Proverbs', chapters: 31 },
  { id: 'Eccl', name: 'Ecclesiastes', chapters: 12 },
  { id: 'Song', name: 'Song of Solomon', chapters: 8 },
  { id: 'Isa', name: 'Isaiah', chapters: 66 },
  { id: 'Jer', name: 'Jeremiah', chapters: 52 },
  { id: 'Lam', name: 'Lamentations', chapters: 5 },
  { id: 'Ezek', name: 'Ezekiel', chapters: 48 },
  { id: 'Dan', name: 'Daniel', chapters: 12 },
  { id: 'Hos', name: 'Hosea', chapters: 14 },
  { id: 'Joel', name: 'Joel', chapters: 3 },
  { id: 'Amos', name: 'Amos', chapters: 9 },
  { id: 'Obad', name: 'Obadiah', chapters: 1 },
  { id: 'Jonah', name: 'Jonah', chapters: 4 },
  { id: 'Mic', name: 'Micah', chapters: 7 },
  { id: 'Nah', name: 'Nahum', chapters: 3 },
  { id: 'Hab', name: 'Habakkuk', chapters: 3 },
  { id: 'Zeph', name: 'Zephaniah', chapters: 3 },
  { id: 'Hag', name: 'Haggai', chapters: 2 },
  { id: 'Zech', name: 'Zechariah', chapters: 14 },
  { id: 'Mal', name: 'Malachi', chapters: 4 },
  { id: 'Matt', name: 'Matthew', chapters: 28 },
  { id: 'Mark', name: 'Mark', chapters: 16 },
  { id: 'Luke', name: 'Luke', chapters: 24 },
  { id: 'John', name: 'John', chapters: 21 },
  { id: 'Acts', name: 'Acts', chapters: 28 },
  { id: 'Rom', name: 'Romans', chapters: 16 },
  { id: '1Cor', name: '1 Corinthians', chapters: 16 },
  { id: '2Cor', name: '2 Corinthians', chapters: 13 },
  { id: 'Gal', name: 'Galatians', chapters: 6 },
  { id: 'Eph', name: 'Ephesians', chapters: 6 },
  { id: 'Phil', name: 'Philippians', chapters: 4 },
  { id: 'Col', name: 'Colossians', chapters: 4 },
  { id: '1Thess', name: '1 Thessalonians', chapters: 5 },
  { id: '2Thess', name: '2 Thessalonians', chapters: 3 },
  { id: '1Tim', name: '1 Timothy', chapters: 6 },
  { id: '2Tim', name: '2 Timothy', chapters: 4 },
  { id: 'Titus', name: 'Titus', chapters: 3 },
  { id: 'Phlm', name: 'Philemon', chapters: 1 },
  { id: 'Heb', name: 'Hebrews', chapters: 13 },
  { id: 'Jas', name: 'James', chapters: 5 },
  { id: '1Pet', name: '1 Peter', chapters: 5 },
  { id: '2Pet', 'name': '2 Peter', chapters: 3 },
  { id: '1John', name: '1 John', chapters: 5 },
  { id: '2John', name: '2 John', chapters: 1 },
  { id: '3John', name: '3 John', chapters: 1 },
  { id: 'Jude', name: 'Jude', chapters: 1 },
  { id: 'Rev', name: 'Revelation', chapters: 22 },
];
