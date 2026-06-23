import { ui, type UIKey } from './ui';

export type Locale = 'es' | 'en';
export const DEFAULT_LOCALE: Locale = 'es';
export const LOCALES: Locale[] = ['es', 'en'];

/** Los ids del loader `glob` lucen como "es/mi-proyecto". Devuelve el locale. */
export function getLocaleFromId(id: string): Locale {
  const seg = id.split('/')[0];
  return seg === 'en' ? 'en' : 'es';
}

/** Devuelve el slug (todo lo que sigue al segmento de locale). */
export function getSlugFromId(id: string): string {
  return id.split('/').slice(1).join('/');
}

/** Devuelve una función `t(key)` para el locale dado, con fallback al default. */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[DEFAULT_LOCALE][key];
  };
}
