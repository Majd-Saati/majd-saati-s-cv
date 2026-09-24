export { STORAGE_KEYS } from './storageKeys';

// Storage can throw (private mode, disabled cookies), so failures are ignored
// and the app falls back to defaults.

export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}
