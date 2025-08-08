import React from 'react';
import type { Translation } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeaderProps {
  selectedTranslation: string;
  onTranslationChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onToggleSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ selectedTranslation, onTranslationChange, onToggleSettings }) => {
  return (
    <header className="bg-header text-header shadow-md flex items-center justify-between p-2 sm:p-3 shrink-0 border-b border-theme">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2 text-link" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-5.747-5.747h11.494" />
        </svg>
        <h1 className="text-lg sm:text-xl font-semibold tracking-wide">GNOME Bible</h1>
      </div>
      <div className="flex items-center gap-4">
        <select
          id="translation"
          value={selectedTranslation}
          onChange={onTranslationChange}
          className="bg-tertiary border border-theme text-primary text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          aria-label="Select Bible translation"
        >
          {TRANSLATIONS.map((translation: Translation) => (
            <option key={translation.id} value={translation.id}>
              {translation.name}
            </option>
          ))}
        </select>
        <button onClick={onToggleSettings} className="p-2 rounded-full hover:bg-tertiary hover:text-primary" aria-label="Open settings">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;