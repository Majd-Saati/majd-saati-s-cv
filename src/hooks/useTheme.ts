import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { STORAGE_KEYS, readStorage, writeStorage } from '../lib/storage';

export type Theme = 'light' | 'dark';

const DARK_QUERY = '(prefers-color-scheme: dark)';

function subscribeToSystemTheme(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function getSystemTheme(): Theme {
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme | null {
  const stored = readStorage(STORAGE_KEYS.theme);
  return stored === 'light' || stored === 'dark' ? stored : null;
}

/**
 * Follows the system color scheme until the user picks a theme explicitly;
 * the explicit choice is then persisted.
 */
export function useTheme() {
  const systemTheme = useSyncExternalStore(subscribeToSystemTheme, getSystemTheme, () => 'light' as const);
  const [storedTheme, setStoredTheme] = useState<Theme | null>(getStoredTheme);
  const theme = storedTheme ?? systemTheme;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    writeStorage(STORAGE_KEYS.theme, next);
    setStoredTheme(next);
  }, [theme]);

  return { theme, toggleTheme };
}
