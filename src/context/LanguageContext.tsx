import { createContext, ReactNode, useContext } from 'react';

export type Lang = 'uk' | 'en';

export const LANG_STORAGE_KEY = 'deckLang';

export function getInitialLang(): Lang {
  try {
    return localStorage.getItem(LANG_STORAGE_KEY) === 'en' ? 'en' : 'uk';
  } catch {
    return 'uk';
  }
}

export const LanguageContext = createContext<Lang>('uk');

export const useLang = () => useContext(LanguageContext);

/** Pick the string/node for the active language: `tr(lang, 'привіт', 'hello')`. */
export function tr<T>(lang: Lang, uk: T, en: T): T {
  return lang === 'en' ? en : uk;
}

/**
 * Inline bilingual text for static JSX (slide content that isn't a render
 * function). Reads the language from context at render time.
 */
export function T({ uk, en }: { uk: ReactNode; en: ReactNode }) {
  const lang = useLang();
  return <>{lang === 'en' ? en : uk}</>;
}
