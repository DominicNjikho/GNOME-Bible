import { useState, useEffect, useCallback } from 'react';
import type { AppSettings } from '../types';
import { FONT_OPTIONS, HIGHLIGHT_COLORS } from '../constants';

const SETTINGS_KEY = 'bible-app-settings';

const defaultSettings: AppSettings = {
  theme: 'light',
  fontFamily: FONT_OPTIONS[0].value,
  fontSize: 18,
  lineHeight: 1.7,
  letterSpacing: 0.01,
  highlightColor: HIGHLIGHT_COLORS[0],
  displayMode: 'paragraph',
};

const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const storedSettings = window.localStorage.getItem(SETTINGS_KEY);
      if (storedSettings) {
        return { ...defaultSettings, ...JSON.parse(storedSettings) };
      }
    } catch (error) {
      console.error("Failed to load settings from localStorage", error);
    }
    return defaultSettings;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        
      // Apply settings to the document root
      const root = document.documentElement;
      root.className = settings.theme;
      root.style.setProperty('--font-family', settings.fontFamily);
      root.style.setProperty('--font-size', `${settings.fontSize}px`);
      root.style.setProperty('--line-height', String(settings.lineHeight));
      root.style.setProperty('--letter-spacing', `${settings.letterSpacing}em`);
      root.style.setProperty('--color-highlight-bg', settings.highlightColor);

    } catch (error) {
      console.error("Failed to save settings to localStorage", error);
    }
  }, [settings]);

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  return { settings, updateSettings };
};

export default useSettings;
