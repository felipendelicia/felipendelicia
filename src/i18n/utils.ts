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

/** Lanza si los slugs no coinciden entre locales (es/en). Pure: opera sobre ids del glob loader. */
export function assertPaired(label: string, ids: string[]): void {
  const bySlug = { es: new Set<string>(), en: new Set<string>() };
  for (const id of ids) bySlug[getLocaleFromId(id)].add(getSlugFromId(id));
  const onlyEs = [...bySlug.es].filter((s) => !bySlug.en.has(s));
  const onlyEn = [...bySlug.en].filter((s) => !bySlug.es.has(s));
  if (onlyEs.length || onlyEn.length) {
    throw new Error(
      `Contenido "${label}" sin parear es/en. Solo ES: [${onlyEs.join(', ')}]. Solo EN: [${onlyEn.join(', ')}]. ` +
        `Cada ítem debe existir con el mismo nombre de archivo en es/ y en/.`,
    );
  }
}
