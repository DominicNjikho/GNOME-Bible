import React, { useState } from 'react';
import type { AppSettings } from '../types';
import { FONT_OPTIONS, HIGHLIGHT_COLORS } from '../constants';
import OfflineManager from './OfflineManager';
import useOfflineManager from '../hooks/useOfflineManager';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  offlineManager: ReturnType<typeof useOfflineManager>;
}

type Tab = 'display' | 'offline';

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose, settings, updateSettings, offlineManager }) => {
  const [activeTab, setActiveTab] = useState<Tab>('display');

  if (!isOpen) return null;

  const handleUpdate = (key: keyof AppSettings, value: any) => {
    updateSettings({ [key]: value });
  };
  
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const renderDisplaySettings = () => (
    <div className="space-y-6">
      {/* Theme */}
      <div>
        <label className="block text-sm font-medium text-primary mb-2">Theme</label>
        <div className="flex gap-2">
          <button onClick={() => handleUpdate('theme', 'light')} className={`px-4 py-2 text-sm rounded-md w-full transition-colors ${settings.theme === 'light' ? 'bg-blue-600 text-white' : 'bg-tertiary'}`}>Light</button>
          <button onClick={() => handleUpdate('theme', 'dark')} className={`px-4 py-2 text-sm rounded-md w-full transition-colors ${settings.theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-tertiary'}`}>Dark</button>
        </div>
      </div>
      
      {/* Display Mode */}
      <div>
        <label className="block text-sm font-medium text-primary mb-2">Text Layout</label>
        <div className="flex gap-2">
          <button onClick={() => handleUpdate('displayMode', 'paragraph')} className={`px-4 py-2 text-sm rounded-md w-full transition-colors ${settings.displayMode === 'paragraph' ? 'bg-blue-600 text-white' : 'bg-tertiary'}`}>Paragraph</button>
          <button onClick={() => handleUpdate('displayMode', 'verse')} className={`px-4 py-2 text-sm rounded-md w-full transition-colors ${settings.displayMode === 'verse' ? 'bg-blue-600 text-white' : 'bg-tertiary'}`}>Verse-by-Verse</button>
        </div>
      </div>
      
      {/* Font Family */}
      <div>
        <label htmlFor="font-family" className="block text-sm font-medium text-primary mb-2">Font</label>
        <select id="font-family" value={settings.fontFamily} onChange={e => handleUpdate('fontFamily', e.target.value)} className="w-full p-2 rounded-md bg-tertiary border-theme border">
          {FONT_OPTIONS.map(font => <option key={font.value} value={font.value}>{font.label}</option>)}
        </select>
      </div>
      
      {/* Font Size */}
      <div>
        <label htmlFor="font-size" className="block text-sm font-medium text-primary mb-2">Font Size ({settings.fontSize}px)</label>
        <input id="font-size" type="range" min="14" max="24" step="1" value={settings.fontSize} onChange={e => handleUpdate('fontSize', Number(e.target.value))} className="w-full" />
      </div>
      
      {/* Line Height */}
      <div>
        <label htmlFor="line-height" className="block text-sm font-medium text-primary mb-2">Line Spacing ({settings.lineHeight})</label>
        <input id="line-height" type="range" min="1.4" max="2.2" step="0.1" value={settings.lineHeight} onChange={e => handleUpdate('lineHeight', Number(e.target.value))} className="w-full" />
      </div>

      {/* Letter Spacing */}
      <div>
        <label htmlFor="letter-spacing" className="block text-sm font-medium text-primary mb-2">Letter Spacing ({settings.letterSpacing.toFixed(2)}em)</label>
        <input id="letter-spacing" type="range" min="-0.02" max="0.1" step="0.01" value={settings.letterSpacing} onChange={e => handleUpdate('letterSpacing', Number(e.target.value))} className="w-full" />
      </div>

      {/* Highlight Color */}
      <div>
        <label className="block text-sm font-medium text-primary mb-2">Highlight Color</label>
        <div className="flex gap-3">
          {HIGHLIGHT_COLORS.map(color => (
            <button 
              key={color} 
              onClick={() => handleUpdate('highlightColor', color)}
              className={`w-8 h-8 rounded-full color-swatch ${settings.highlightColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              aria-label={`Select highlight color ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="settings-backdrop" onClick={onClose}>
      <div 
        className="settings-panel bg-secondary border-theme border rounded-lg shadow-2xl w-full max-w-lg"
        onClick={stopPropagation}
      >
        <div className="flex justify-between items-center p-4 border-b border-theme">
          <h2 className="text-xl font-bold text-primary">Settings</h2>
          <button onClick={onClose} className="p-1 rounded-full text-secondary hover:bg-tertiary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div>
          <div className="border-b border-theme">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('display')}
                className={`w-1/2 py-3 px-1 text-center border-b-2 font-medium text-sm transition-colors ${activeTab === 'display' ? 'border-blue-500 text-blue-600' : 'border-transparent text-secondary hover:border-gray-300'}`}
              >
                Display
              </button>
              <button
                onClick={() => setActiveTab('offline')}
                className={`w-1/2 py-3 px-1 text-center border-b-2 font-medium text-sm transition-colors ${activeTab === 'offline' ? 'border-blue-500 text-blue-600' : 'border-transparent text-secondary hover:border-gray-300'}`}
              >
                Offline
              </button>
            </nav>
          </div>
          <div className="p-6">
            {activeTab === 'display' && renderDisplaySettings()}
            {activeTab === 'offline' && <OfflineManager {...offlineManager} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
