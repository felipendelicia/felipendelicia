import { describe, it, expect } from 'vitest';
import { getLocaleFromId, getSlugFromId, useTranslations } from './utils';

describe('getLocaleFromId', () => {
  it('extrae el locale del prefijo del id', () => {
    expect(getLocaleFromId('es/mi-proyecto')).toBe('es');
    expect(getLocaleFromId('en/my-project')).toBe('en');
  });
  it('cae a "es" si el prefijo no es un locale conocido', () => {
    expect(getLocaleFromId('mi-proyecto')).toBe('es');
  });
});

describe('getSlugFromId', () => {
  it('devuelve la parte posterior al locale', () => {
    expect(getSlugFromId('es/mi-proyecto')).toBe('mi-proyecto');
    expect(getSlugFromId('en/sub/dir/foo')).toBe('sub/dir/foo');
  });
});

describe('useTranslations', () => {
  it('devuelve el string del locale pedido', () => {
    const t = useTranslations('en');
    expect(t('nav.proyectos')).toBe('Projects');
  });
  it('selecciona el string correcto según el locale', () => {
    const es = useTranslations('es');
    const en = useTranslations('en');
    expect(es('site.title')).toBe('Felipe — Desarrollo e Infraestructura TI');
    expect(en('site.title')).toBe('Felipe — Software & IT Infrastructure');
    expect(es('proyectos.volver')).toBe('← Volver');
    expect(en('proyectos.volver')).toBe('← Back');
  });
});
