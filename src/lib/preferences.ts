import { DEFAULT_LANGUAGE, LANGUAGES } from '../i18n/config.ts';
import { STORAGE_KEYS } from './storageKeys.ts';

/**
 * Builds the inline script injected at the top of `<head>`. It applies the
 * saved (or system) theme and language before first paint, which avoids a
 * flash of the wrong theme or text direction. React reads the resulting
 * `<html>` attributes as its initial state, so this is the single source of
 * the initial-preference logic.
 */
export function buildPreferenceScript(): string {
  const directions = Object.fromEntries(Object.entries(LANGUAGES).map(([code, config]) => [code, config.dir]));

  return `(function () {
  var root = document.documentElement;
  var dirs = ${JSON.stringify(directions)};
  var theme = null, lang = null;
  try {
    theme = localStorage.getItem(${JSON.stringify(STORAGE_KEYS.theme)});
    lang = localStorage.getItem(${JSON.stringify(STORAGE_KEYS.language)});
  } catch (e) {}
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  if (!dirs.hasOwnProperty(lang)) {
    var browser = (navigator.language || '').slice(0, 2);
    lang = dirs.hasOwnProperty(browser) ? browser : ${JSON.stringify(DEFAULT_LANGUAGE)};
  }
  root.dataset.theme = theme;
  root.lang = lang;
  root.dir = dirs[lang];
})();`;
}
