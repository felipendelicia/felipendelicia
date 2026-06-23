# Portafolio / CV online — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir una web de portafolio/CV online de Felipe (dev + infraestructura TI), bilingüe ES/EN, desplegada en GitHub Pages, y un README de perfil de GitHub.

**Architecture:** Astro SSG + TypeScript strict. One-page (Hero → Experiencia → Proyectos) con páginas de detalle por proyecto. Contenido en Markdown vía Content Collections (loader `glob`, validado con Zod). i18n nativo de Astro (es en raíz, en bajo `/en/`). Estilado con CSS nativo scoped + design tokens. Tema dark por defecto con toggle a light. Deploy vía GitHub Actions.

**Tech Stack:** Astro 5, TypeScript, `@astrojs/sitemap`, Vitest (solo para utils puros de i18n), GitHub Actions + GitHub Pages.

## Global Constraints

- **Astro 5+**, TypeScript strict (`tsconfig` extiende `astro/tsconfigs/strict`).
- **Node 20+** para build y CI.
- **i18n:** `defaultLocale: 'es'` sin prefijo (raíz `/`), `'en'` bajo `/en/`. `routing.prefixDefaultLocale: false`.
- **Deploy:** `site: 'https://felipendelicia.github.io'`, `base: '/felipendelicia'`. Es *project page* → se sirve en `https://felipendelicia.github.io/felipendelicia/`. Sin `base` correcto los assets dan 404.
- **Tema:** dark por defecto; toggle a light; persistir en `localStorage` con key `'theme'` (valores `'dark'`/`'light'`); script inline anti-FOUC en `<head>`.
- **Sin CDNs externos para fuentes:** system font stack o webfont self-hosted. (Los widgets del README de perfil sí cargan imágenes externas — aceptado.)
- **Contacto:** solo `mailto` + links a GitHub/LinkedIn. Sin formulario, sin backend, sin PDF.
- **Contenido bilingüe pareado:** un mismo ítem usa el **mismo nombre de archivo** en `es/` y `en/` (mismo slug).
- **`README.md`** es el perfil de GitHub: NO mezclar con contenido del sitio.
- **Commits:** sin atribución a Claude/Anthropic.

---

### Task 1: Scaffold del proyecto y configuración base

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `.gitignore`

**Interfaces:**
- Consumes: nada (primer task).
- Produces: scripts npm (`dev`, `build`, `preview`, `check`, `test`); config de Astro con i18n + `site`/`base`; alias TS strict.

- [ ] **Step 1: Crear `package.json`**

```json
{
  "name": "felipendelicia-portfolio",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run"
  },
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/sitemap": "^3.2.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "typescript": "^5.6.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Crear `astro.config.mjs`**

```js
// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://felipendelicia.github.io',
  base: '/felipendelicia',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [sitemap()],
});
```

- [ ] **Step 3: Crear `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: Crear `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

- [ ] **Step 5: Crear `.gitignore`**

```gitignore
node_modules/
dist/
.astro/
.DS_Store
*.log
```

- [ ] **Step 6: Instalar y sincronizar**

Run:
```bash
npm install
npx astro sync
```
Expected: instala dependencias sin errores; `astro sync` genera `.astro/types.d.ts`.

- [ ] **Step 7: Verificar que el build corre**

Run: `npm run build`
Expected: build exitoso (sin páginas todavía Astro advierte "no pages", pero NO debe fallar). Si falla por "no pages found", es esperado en este punto — continuar. La verificación real de build se completa en Task 8.

- [ ] **Step 8: Commit**

```bash
git add package.json astro.config.mjs tsconfig.json vitest.config.ts .gitignore package-lock.json
git commit -m "chore: scaffold Astro project with i18n config"
```

---

### Task 2: Utilidades de i18n (TDD) + strings de UI

**Files:**
- Create: `src/i18n/ui.ts`
- Create: `src/i18n/utils.ts`
- Test: `src/i18n/utils.test.ts`

**Interfaces:**
- Consumes: nada del proyecto.
- Produces:
  - `type Locale = 'es' | 'en'`
  - `const DEFAULT_LOCALE: Locale`
  - `const LOCALES: Locale[]`
  - `getLocaleFromId(id: string): Locale` — de un id del glob loader (`"es/foo"`) devuelve `'es'`.
  - `getSlugFromId(id: string): string` — de `"es/foo"` devuelve `"foo"`.
  - `useTranslations(locale: Locale): (key: UIKey) => string` — con fallback al `DEFAULT_LOCALE`.
  - `const ui` (objeto de strings) y `type UIKey = keyof typeof ui['es']`.

- [ ] **Step 1: Escribir el test que falla**

`src/i18n/utils.test.ts`:
```ts
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
  it('cae al locale por defecto si falta la key en el locale', () => {
    const t = useTranslations('en');
    // 'site.title' existe en ambos; este test verifica que no rompe.
    expect(typeof t('site.title')).toBe('string');
  });
});
```

- [ ] **Step 2: Correr el test y verificar que falla**

Run: `npm test`
Expected: FAIL — `Cannot find module './utils'` (todavía no existe).

- [ ] **Step 3: Crear `src/i18n/ui.ts`**

```ts
export const ui = {
  es: {
    'site.title': 'Felipe — Desarrollo e Infraestructura TI',
    'site.description':
      'Portafolio de Felipe: desarrollo de software e infraestructura TI.',
    'nav.experiencia': 'Experiencia',
    'nav.proyectos': 'Proyectos',
    'nav.contacto': 'Contacto',
    'hero.titulo': 'Hola, soy Felipe',
    'hero.subtitulo': 'Desarrollo de software e infraestructura TI.',
    'experiencia.actualidad': 'Actualidad',
    'proyectos.verRepo': 'Código',
    'proyectos.verDemo': 'Demo',
    'proyectos.volver': '← Volver',
    'a11y.skip': 'Saltar al contenido',
    'a11y.tema': 'Cambiar tema claro/oscuro',
    'a11y.idioma': 'Cambiar idioma',
  },
  en: {
    'site.title': 'Felipe — Software & IT Infrastructure',
    'site.description':
      "Felipe's portfolio: software development and IT infrastructure.",
    'nav.experiencia': 'Experience',
    'nav.proyectos': 'Projects',
    'nav.contacto': 'Contact',
    'hero.titulo': "Hi, I'm Felipe",
    'hero.subtitulo': 'Software development and IT infrastructure.',
    'experiencia.actualidad': 'Present',
    'proyectos.verRepo': 'Code',
    'proyectos.verDemo': 'Demo',
    'proyectos.volver': '← Back',
    'a11y.skip': 'Skip to content',
    'a11y.tema': 'Toggle light/dark theme',
    'a11y.idioma': 'Change language',
  },
} as const;

export type UIKey = keyof (typeof ui)['es'];
```

- [ ] **Step 4: Crear `src/i18n/utils.ts`**

```ts
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
```

- [ ] **Step 5: Correr los tests y verificar que pasan**

Run: `npm test`
Expected: PASS — los 5 tests verdes.

- [ ] **Step 6: Commit**

```bash
git add src/i18n/
git commit -m "feat(i18n): add locale utils and UI strings"
```

---

### Task 3: Content Collections (schema + contenido de ejemplo)

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/experiencia/es/ejemplo.md`
- Create: `src/content/experiencia/en/ejemplo.md`
- Create: `src/content/proyectos/es/ejemplo.md`
- Create: `src/content/proyectos/en/ejemplo.md`

**Interfaces:**
- Consumes: nada del proyecto (solo `astro:content` y `astro/loaders`).
- Produces: colecciones `experiencia` y `proyectos`. Tipos de `data`:
  - `experiencia.data`: `{ empresa: string; rol: string; inicio: Date; fin: Date | null; orden: number; tags: string[] }`
  - `proyectos.data`: `{ titulo: string; resumen: string; stack: string[]; repo?: string; demo?: string; destacado: boolean; orden: number; fecha: Date }`

- [ ] **Step 1: Crear `src/content.config.ts`**

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const experiencia = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experiencia' }),
  schema: z.object({
    empresa: z.string(),
    rol: z.string(),
    inicio: z.coerce.date(),
    fin: z.coerce.date().nullable(),
    orden: z.number(),
    tags: z.array(z.string()).default([]),
  }),
});

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: z.object({
    titulo: z.string(),
    resumen: z.string(),
    stack: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    destacado: z.boolean().default(false),
    orden: z.number(),
    fecha: z.coerce.date(),
  }),
});

export const collections = { experiencia, proyectos };
```

- [ ] **Step 2: Crear `src/content/experiencia/es/ejemplo.md`**

```md
---
empresa: "Empresa Ejemplo"
rol: "Desarrollador / SysAdmin"
inicio: 2023-01-01
fin: null
orden: 1
tags: ["TypeScript", "Docker", "Linux"]
---

Reemplazar con un puesto real: responsabilidades y logros concretos
(impacto medible, tecnologías, escala).
```

- [ ] **Step 3: Crear `src/content/experiencia/en/ejemplo.md`**

```md
---
empresa: "Example Company"
rol: "Developer / SysAdmin"
inicio: 2023-01-01
fin: null
orden: 1
tags: ["TypeScript", "Docker", "Linux"]
---

Replace with a real role: responsibilities and concrete achievements
(measurable impact, technologies, scale).
```

- [ ] **Step 4: Crear `src/content/proyectos/es/ejemplo.md`**

```md
---
titulo: "Proyecto Ejemplo"
resumen: "Una línea que describe el proyecto y su valor."
stack: ["Astro", "TypeScript"]
repo: "https://github.com/felipendelicia/ejemplo"
destacado: true
orden: 1
fecha: 2024-06-01
---

Descripción larga del proyecto: el problema, la solución, decisiones
técnicas y resultado. Este cuerpo se renderiza en la página de detalle.
```

- [ ] **Step 5: Crear `src/content/proyectos/en/ejemplo.md`**

```md
---
titulo: "Example Project"
resumen: "A one-liner describing the project and its value."
stack: ["Astro", "TypeScript"]
repo: "https://github.com/felipendelicia/ejemplo"
destacado: true
orden: 1
fecha: 2024-06-01
---

Long project description: the problem, the solution, technical decisions
and outcome. This body renders on the detail page.
```

- [ ] **Step 6: Verificar que el schema valida**

Run: `npx astro sync && npm run check`
Expected: sin errores de tipos ni de contenido. Si un frontmatter no cumpliera el schema Zod, el comando fallaría (comportamiento fail-fast deseado).

- [ ] **Step 7: Commit**

```bash
git add src/content.config.ts src/content/
git commit -m "feat(content): add experiencia & proyectos collections with sample entries"
```

---

### Task 4: Design tokens y CSS global

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`

**Interfaces:**
- Consumes: nada.
- Produces: custom properties CSS para tema dark (`:root`) y light (`:root[data-theme='light']`); reset + estilos base aplicados globalmente.

- [ ] **Step 1: Crear `src/styles/tokens.css`**

```css
:root {
  /* Tema dark (default) */
  --bg: #0d0d0f;
  --surface: #16161a;
  --text: #ededf0;
  --muted: #a0a0a8;
  --accent: #6ea8fe;
  --border: #26262c;
  --color-scheme: dark;

  /* Escala / tipografía */
  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  --maxw: 48rem;
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 2rem;
  --space-4: 4rem;
  --radius: 0.5rem;
}

:root[data-theme='light'] {
  --bg: #fafafa;
  --surface: #ffffff;
  --text: #18181b;
  --muted: #52525b;
  --accent: #2563eb;
  --border: #e4e4e7;
  --color-scheme: light;
}
```

- [ ] **Step 2: Crear `src/styles/global.css`**

```css
@import './tokens.css';

*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }

html { color-scheme: var(--color-scheme); scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

main { max-width: var(--maxw); margin-inline: auto; padding: var(--space-3) var(--space-2); }

a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }

:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

h1, h2, h3 { line-height: 1.2; font-weight: 700; }

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  background: var(--surface);
  color: var(--text);
  padding: var(--space-1) var(--space-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.skip-link:focus { left: var(--space-2); top: var(--space-2); z-index: 10; }
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/
git commit -m "feat(styles): add design tokens and global CSS (dark+light)"
```

---

### Task 5: Layout base (`Base.astro`)

**Files:**
- Create: `src/layouts/Base.astro`

**Interfaces:**
- Consumes: `useTranslations`, `Locale` (Task 2); `global.css` (Task 4); `astro:i18n` (`getAbsoluteLocaleUrl`).
- Produces: componente `Base` con props `{ locale: Locale; title: string; description: string; path?: string }`. Renderiza `<head>` (SEO, hreflang, color-scheme), script anti-FOUC del tema, skip-link, slot `<header>` y `<main>`. Expone slots con nombre `header` y default.

- [ ] **Step 1: Crear `src/layouts/Base.astro`**

```astro
---
import '../styles/global.css';
import { getAbsoluteLocaleUrl } from 'astro:i18n';
import { useTranslations, type Locale } from '../i18n/utils';

interface Props {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
}

const { locale, title, description, path = '' } = Astro.props;
const t = useTranslations(locale);
const esUrl = getAbsoluteLocaleUrl('es', path);
const enUrl = getAbsoluteLocaleUrl('en', path);
const canonical = getAbsoluteLocaleUrl(locale, path);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <link rel="alternate" hreflang="es" href={esUrl} />
    <link rel="alternate" hreflang="en" href={enUrl} />
    <link rel="alternate" hreflang="x-default" href={esUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonical} />
    <link rel="icon" href={`${import.meta.env.BASE_URL}favicon.svg`} type="image/svg+xml" />
    <!-- Anti-FOUC: setea el tema antes del primer paint -->
    <script is:inline>
      (function () {
        var stored = localStorage.getItem('theme');
        var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
        document.documentElement.dataset.theme = theme;
      })();
    </script>
  </head>
  <body>
    <a class="skip-link" href="#contenido">{t('a11y.skip')}</a>
    <slot name="header" />
    <main id="contenido">
      <slot />
    </main>
  </body>
</html>
```

- [ ] **Step 2: Verificar typecheck**

Run: `npm run check`
Expected: sin errores (puede advertir que `Base` no se usa todavía — no es error).

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Base.astro
git commit -m "feat(layout): add Base layout with SEO, hreflang and anti-FOUC theme"
```

---

### Task 6: Componentes de header (Nav, ThemeToggle, LanguagePicker)

**Files:**
- Create: `src/components/ThemeToggle.astro`
- Create: `src/components/LanguagePicker.astro`
- Create: `src/components/Nav.astro`

**Interfaces:**
- Consumes: `useTranslations`, `Locale`, `LOCALES` (Task 2); `astro:i18n` (`getRelativeLocaleUrl`).
- Produces:
  - `ThemeToggle` (sin props) — botón que alterna `data-theme` y persiste en `localStorage`.
  - `LanguagePicker` props `{ locale: Locale; path?: string }` — links a la versión equivalente en cada idioma.
  - `Nav` props `{ locale: Locale; path?: string }` — barra con anclas a secciones + `LanguagePicker` + `ThemeToggle`. Va en el slot `header`.

- [ ] **Step 1: Crear `src/components/ThemeToggle.astro`**

```astro
---
import { useTranslations, type Locale } from '../i18n/utils';
interface Props { locale: Locale }
const { locale } = Astro.props;
const t = useTranslations(locale);
---
<button id="theme-toggle" type="button" aria-label={t('a11y.tema')}>
  <span aria-hidden="true">◐</span>
</button>

<script>
  const btn = document.getElementById('theme-toggle');
  btn?.addEventListener('click', () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
  });
</script>

<style>
  button {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text);
    border-radius: var(--radius);
    padding: 0.25rem 0.6rem;
    cursor: pointer;
    font-size: 1rem;
  }
</style>
```

- [ ] **Step 2: Crear `src/components/LanguagePicker.astro`**

```astro
---
import { getRelativeLocaleUrl } from 'astro:i18n';
import { LOCALES, useTranslations, type Locale } from '../i18n/utils';
interface Props { locale: Locale; path?: string }
const { locale, path = '' } = Astro.props;
const t = useTranslations(locale);
const labels: Record<Locale, string> = { es: 'ES', en: 'EN' };
---
<nav class="lang" aria-label={t('a11y.idioma')}>
  {LOCALES.map((l) => (
    <a
      href={getRelativeLocaleUrl(l, path)}
      aria-current={l === locale ? 'true' : undefined}
      class={l === locale ? 'active' : ''}
    >{labels[l]}</a>
  ))}
</nav>

<style>
  .lang { display: inline-flex; gap: var(--space-1); }
  .lang a { color: var(--muted); }
  .lang a.active { color: var(--text); font-weight: 700; }
</style>
```

- [ ] **Step 3: Crear `src/components/Nav.astro`**

```astro
---
import LanguagePicker from './LanguagePicker.astro';
import ThemeToggle from './ThemeToggle.astro';
import { useTranslations, type Locale } from '../i18n/utils';
interface Props { locale: Locale; path?: string }
const { locale, path = '' } = Astro.props;
const t = useTranslations(locale);
---
<header class="site-header">
  <nav class="links" aria-label="Principal">
    <a href="#experiencia">{t('nav.experiencia')}</a>
    <a href="#proyectos">{t('nav.proyectos')}</a>
  </nav>
  <div class="actions">
    <LanguagePicker locale={locale} path={path} />
    <ThemeToggle locale={locale} />
  </div>
</header>

<style>
  .site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-2);
    max-width: var(--maxw);
    margin-inline: auto;
    padding: var(--space-2);
    border-bottom: 1px solid var(--border);
  }
  .links { display: flex; gap: var(--space-2); }
  .actions { display: flex; gap: var(--space-2); align-items: center; }
</style>
```

- [ ] **Step 4: Verificar typecheck**

Run: `npm run check`
Expected: sin errores.

- [ ] **Step 5: Commit**

```bash
git add src/components/ThemeToggle.astro src/components/LanguagePicker.astro src/components/Nav.astro
git commit -m "feat(components): add Nav, ThemeToggle and LanguagePicker"
```

---

### Task 7: Componentes de contenido (Hero, ExperienciaItem, ProyectoCard, Footer)

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/ExperienciaItem.astro`
- Create: `src/components/ProyectoCard.astro`
- Create: `src/components/Footer.astro`

**Interfaces:**
- Consumes: `useTranslations`, `Locale` (Task 2); tipos de colección de Task 3 (`CollectionEntry<'experiencia'>`, `CollectionEntry<'proyectos'>`); `astro:i18n` (`getRelativeLocaleUrl`).
- Produces:
  - `Hero` props `{ locale: Locale }`.
  - `ExperienciaItem` props `{ entry: CollectionEntry<'experiencia'>; locale: Locale }`.
  - `ProyectoCard` props `{ entry: CollectionEntry<'proyectos'>; locale: Locale; slug: string }`.
  - `Footer` props `{ locale: Locale }`.

- [ ] **Step 1: Crear `src/components/Hero.astro`**

```astro
---
import { useTranslations, type Locale } from '../i18n/utils';
interface Props { locale: Locale }
const { locale } = Astro.props;
const t = useTranslations(locale);
---
<section class="hero">
  <h1>{t('hero.titulo')}</h1>
  <p>{t('hero.subtitulo')}</p>
  <p class="contacto">
    <a href="mailto:delicia4581@gmail.com">delicia4581@gmail.com</a>
    · <a href="https://github.com/felipendelicia">GitHub</a>
  </p>
</section>

<style>
  .hero { padding-block: var(--space-3); }
  .hero h1 { font-size: clamp(2rem, 6vw, 3rem); }
  .hero p { color: var(--muted); margin-top: var(--space-1); }
  .contacto { font-size: 0.95rem; }
</style>
```

- [ ] **Step 2: Crear `src/components/ExperienciaItem.astro`**

```astro
---
import { render, type CollectionEntry } from 'astro:content';
import { useTranslations, type Locale } from '../i18n/utils';

interface Props { entry: CollectionEntry<'experiencia'>; locale: Locale }
const { entry, locale } = Astro.props;
const t = useTranslations(locale);
const { Content } = await render(entry);

const fmt = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short' });
const inicio = fmt.format(entry.data.inicio);
const fin = entry.data.fin ? fmt.format(entry.data.fin) : t('experiencia.actualidad');
---
<article class="exp">
  <header>
    <h3>{entry.data.rol} · {entry.data.empresa}</h3>
    <p class="fechas">{inicio} — {fin}</p>
  </header>
  <div class="cuerpo"><Content /></div>
  {entry.data.tags.length > 0 && (
    <ul class="tags">
      {entry.data.tags.map((tag) => <li>{tag}</li>)}
    </ul>
  )}
</article>

<style>
  .exp { padding-block: var(--space-2); border-bottom: 1px solid var(--border); }
  .exp h3 { font-size: 1.1rem; }
  .fechas { color: var(--muted); font-size: 0.9rem; }
  .cuerpo { margin-top: var(--space-1); }
  .tags { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: var(--space-1); margin-top: var(--space-1); }
  .tags li { font-family: var(--font-mono); font-size: 0.8rem; color: var(--muted); border: 1px solid var(--border); border-radius: var(--radius); padding: 0.1rem 0.5rem; }
</style>
```

- [ ] **Step 3: Crear `src/components/ProyectoCard.astro`**

```astro
---
import { getRelativeLocaleUrl } from 'astro:i18n';
import { type CollectionEntry } from 'astro:content';
import { type Locale } from '../i18n/utils';

interface Props { entry: CollectionEntry<'proyectos'>; locale: Locale; slug: string }
const { entry, locale, slug } = Astro.props;
const href = getRelativeLocaleUrl(locale, `proyectos/${slug}`);
---
<a class="card" href={href}>
  <h3>{entry.data.titulo}</h3>
  <p>{entry.data.resumen}</p>
  <ul class="stack">
    {entry.data.stack.map((s) => <li>{s}</li>)}
  </ul>
</a>

<style>
  .card {
    display: block;
    color: var(--text);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: var(--space-2);
    transition: border-color 0.15s ease;
  }
  .card:hover { border-color: var(--accent); text-decoration: none; }
  .card p { color: var(--muted); margin-top: var(--space-1); }
  .stack { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: var(--space-1); margin-top: var(--space-2); }
  .stack li { font-family: var(--font-mono); font-size: 0.8rem; color: var(--muted); }
</style>
```

- [ ] **Step 4: Crear `src/components/Footer.astro`**

```astro
---
import { type Locale } from '../i18n/utils';
interface Props { locale: Locale }
const { locale } = Astro.props;
const year = new Date().getFullYear();
---
<footer>
  <p>© {year} Felipe ·
    <a href="mailto:delicia4581@gmail.com">delicia4581@gmail.com</a> ·
    <a href="https://github.com/felipendelicia">GitHub</a>
  </p>
</footer>

<style>
  footer {
    max-width: var(--maxw);
    margin-inline: auto;
    padding: var(--space-3) var(--space-2);
    border-top: 1px solid var(--border);
    color: var(--muted);
    font-size: 0.9rem;
  }
</style>
```

- [ ] **Step 5: Verificar typecheck**

Run: `npm run check`
Expected: sin errores.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.astro src/components/ExperienciaItem.astro src/components/ProyectoCard.astro src/components/Footer.astro
git commit -m "feat(components): add Hero, ExperienciaItem, ProyectoCard, Footer"
```

---

### Task 8: Páginas home (ES + EN)

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/en/index.astro`

**Interfaces:**
- Consumes: `Base` (Task 5); `Nav`, `Hero`, `ExperienciaItem`, `ProyectoCard`, `Footer` (Tasks 6-7); `getCollection` (`astro:content`); `getLocaleFromId`, `getSlugFromId`, `useTranslations` (Task 2).
- Produces: rutas `/` (es) y `/en/` (en) renderizando Hero + Experiencia + grid de Proyectos destacados.

- [ ] **Step 1: Crear `src/pages/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import ExperienciaItem from '../components/ExperienciaItem.astro';
import ProyectoCard from '../components/ProyectoCard.astro';
import Footer from '../components/Footer.astro';
import { getLocaleFromId, getSlugFromId, useTranslations } from '../i18n/utils';

const locale = 'es' as const;
const t = useTranslations(locale);

const experiencia = (await getCollection('experiencia'))
  .filter((e) => getLocaleFromId(e.id) === locale)
  .sort((a, b) => b.data.orden - a.data.orden);

const proyectos = (await getCollection('proyectos'))
  .filter((p) => getLocaleFromId(p.id) === locale && p.data.destacado)
  .sort((a, b) => a.data.orden - b.data.orden);
---
<Base locale={locale} title={t('site.title')} description={t('site.description')} path="">
  <Nav slot="header" locale={locale} path="" />
  <Hero locale={locale} />

  <section id="experiencia">
    <h2>{t('nav.experiencia')}</h2>
    {experiencia.map((e) => <ExperienciaItem entry={e} locale={locale} />)}
  </section>

  <section id="proyectos">
    <h2>{t('nav.proyectos')}</h2>
    <div class="grid">
      {proyectos.map((p) => (
        <ProyectoCard entry={p} locale={locale} slug={getSlugFromId(p.id)} />
      ))}
    </div>
  </section>

  <Footer locale={locale} />
</Base>

<style>
  section { padding-block: var(--space-3); }
  section h2 { margin-bottom: var(--space-2); }
  .grid { display: grid; gap: var(--space-2); grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr)); }
</style>
```

- [ ] **Step 2: Crear `src/pages/en/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import Nav from '../../components/Nav.astro';
import Hero from '../../components/Hero.astro';
import ExperienciaItem from '../../components/ExperienciaItem.astro';
import ProyectoCard from '../../components/ProyectoCard.astro';
import Footer from '../../components/Footer.astro';
import { getLocaleFromId, getSlugFromId, useTranslations } from '../../i18n/utils';

const locale = 'en' as const;
const t = useTranslations(locale);

const experiencia = (await getCollection('experiencia'))
  .filter((e) => getLocaleFromId(e.id) === locale)
  .sort((a, b) => b.data.orden - a.data.orden);

const proyectos = (await getCollection('proyectos'))
  .filter((p) => getLocaleFromId(p.id) === locale && p.data.destacado)
  .sort((a, b) => a.data.orden - b.data.orden);
---
<Base locale={locale} title={t('site.title')} description={t('site.description')} path="">
  <Nav slot="header" locale={locale} path="" />
  <Hero locale={locale} />

  <section id="experiencia">
    <h2>{t('nav.experiencia')}</h2>
    {experiencia.map((e) => <ExperienciaItem entry={e} locale={locale} />)}
  </section>

  <section id="proyectos">
    <h2>{t('nav.proyectos')}</h2>
    <div class="grid">
      {proyectos.map((p) => (
        <ProyectoCard entry={p} locale={locale} slug={getSlugFromId(p.id)} />
      ))}
    </div>
  </section>

  <Footer locale={locale} />
</Base>

<style>
  section { padding-block: var(--space-3); }
  section h2 { margin-bottom: var(--space-2); }
  .grid { display: grid; gap: var(--space-2); grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr)); }
</style>
```

- [ ] **Step 3: Verificar build completo**

Run: `npm run check && npm run build`
Expected: build exitoso. En `dist/` aparecen `index.html` y `en/index.html`. Sin errores.

- [ ] **Step 4: Verificación visual local**

Run: `npm run preview`
Expected: abrir `http://localhost:4321/felipendelicia/` → se ve Hero + Experiencia + Proyectos. El toggle de tema cambia dark/light y persiste al recargar. El picker ES/EN navega a `/felipendelicia/en/`. Detener con Ctrl-C.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro src/pages/en/index.astro
git commit -m "feat(pages): add ES and EN home pages"
```

---

### Task 9: Páginas de detalle de proyecto (ES + EN)

**Files:**
- Create: `src/pages/proyectos/[slug].astro`
- Create: `src/pages/en/proyectos/[slug].astro`

**Interfaces:**
- Consumes: `Base` (Task 5); `Nav`, `Footer` (Tasks 6-7); `getCollection`, `render` (`astro:content`); `getLocaleFromId`, `getSlugFromId`, `useTranslations` (Task 2); `astro:i18n` (`getRelativeLocaleUrl`).
- Produces: rutas `/proyectos/[slug]` (es) y `/en/proyectos/[slug]` (en), una por entrada de proyecto del locale.

- [ ] **Step 1: Crear `src/pages/proyectos/[slug].astro`**

```astro
---
import { getCollection, render } from 'astro:content';
import { getRelativeLocaleUrl } from 'astro:i18n';
import Base from '../../layouts/Base.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import { getLocaleFromId, getSlugFromId, useTranslations } from '../../i18n/utils';

export async function getStaticPaths() {
  const all = await getCollection('proyectos');
  return all
    .filter((e) => getLocaleFromId(e.id) === 'es')
    .map((e) => ({ params: { slug: getSlugFromId(e.id) }, props: { entry: e } }));
}

const locale = 'es' as const;
const t = useTranslations(locale);
const { entry } = Astro.props;
const slug = getSlugFromId(entry.id);
const path = `proyectos/${slug}`;
const { Content } = await render(entry);
const home = getRelativeLocaleUrl(locale, 'proyectos');
---
<Base locale={locale} title={entry.data.titulo} description={entry.data.resumen} path={path}>
  <Nav slot="header" locale={locale} path={path} />
  <article>
    <a href={getRelativeLocaleUrl(locale, '')}>{t('proyectos.volver')}</a>
    <h1>{entry.data.titulo}</h1>
    <ul class="stack">{entry.data.stack.map((s) => <li>{s}</li>)}</ul>
    <div class="links">
      {entry.data.repo && <a href={entry.data.repo}>{t('proyectos.verRepo')}</a>}
      {entry.data.demo && <a href={entry.data.demo}>{t('proyectos.verDemo')}</a>}
    </div>
    <div class="cuerpo"><Content /></div>
  </article>
  <Footer locale={locale} />
</Base>

<style>
  article { padding-block: var(--space-3); }
  h1 { margin-block: var(--space-2); }
  .stack { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: var(--space-1); }
  .stack li { font-family: var(--font-mono); font-size: 0.8rem; color: var(--muted); }
  .links { display: flex; gap: var(--space-2); margin-block: var(--space-2); }
  .cuerpo { margin-top: var(--space-2); }
</style>
```

- [ ] **Step 2: Crear `src/pages/en/proyectos/[slug].astro`**

```astro
---
import { getCollection, render } from 'astro:content';
import { getRelativeLocaleUrl } from 'astro:i18n';
import Base from '../../../layouts/Base.astro';
import Nav from '../../../components/Nav.astro';
import Footer from '../../../components/Footer.astro';
import { getLocaleFromId, getSlugFromId, useTranslations } from '../../../i18n/utils';

export async function getStaticPaths() {
  const all = await getCollection('proyectos');
  return all
    .filter((e) => getLocaleFromId(e.id) === 'en')
    .map((e) => ({ params: { slug: getSlugFromId(e.id) }, props: { entry: e } }));
}

const locale = 'en' as const;
const t = useTranslations(locale);
const { entry } = Astro.props;
const slug = getSlugFromId(entry.id);
const path = `proyectos/${slug}`;
const { Content } = await render(entry);
---
<Base locale={locale} title={entry.data.titulo} description={entry.data.resumen} path={path}>
  <Nav slot="header" locale={locale} path={path} />
  <article>
    <a href={getRelativeLocaleUrl(locale, '')}>{t('proyectos.volver')}</a>
    <h1>{entry.data.titulo}</h1>
    <ul class="stack">{entry.data.stack.map((s) => <li>{s}</li>)}</ul>
    <div class="links">
      {entry.data.repo && <a href={entry.data.repo}>{t('proyectos.verRepo')}</a>}
      {entry.data.demo && <a href={entry.data.demo}>{t('proyectos.verDemo')}</a>}
    </div>
    <div class="cuerpo"><Content /></div>
  </article>
  <Footer locale={locale} />
</Base>

<style>
  article { padding-block: var(--space-3); }
  h1 { margin-block: var(--space-2); }
  .stack { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: var(--space-1); }
  .stack li { font-family: var(--font-mono); font-size: 0.8rem; color: var(--muted); }
  .links { display: flex; gap: var(--space-2); margin-block: var(--space-2); }
  .cuerpo { margin-top: var(--space-2); }
</style>
```

- [ ] **Step 3: Verificar build**

Run: `npm run check && npm run build`
Expected: build exitoso. En `dist/` aparecen `proyectos/ejemplo/index.html` y `en/proyectos/ejemplo/index.html`.

- [ ] **Step 4: Verificación visual local**

Run: `npm run preview`
Expected: en el home, clickear una card de proyecto navega a `/felipendelicia/proyectos/ejemplo/` y muestra el cuerpo del markdown + el botón "Código". El picker EN va a `/felipendelicia/en/proyectos/ejemplo/`. Detener con Ctrl-C.

- [ ] **Step 5: Commit**

```bash
git add src/pages/proyectos/ src/pages/en/proyectos/
git commit -m "feat(pages): add ES and EN project detail pages"
```

---

### Task 10: Página 404 y assets públicos

**Files:**
- Create: `src/pages/404.astro`
- Create: `public/robots.txt`
- Create: `public/favicon.svg`

**Interfaces:**
- Consumes: `Base` (Task 5).
- Produces: página 404 estática; `robots.txt`; favicon SVG.

- [ ] **Step 1: Crear `src/pages/404.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import { getRelativeLocaleUrl } from 'astro:i18n';
const home = getRelativeLocaleUrl('es', '');
---
<Base locale="es" title="404 — Página no encontrada" description="Página no encontrada." path="">
  <section style="text-align:center; padding-block: var(--space-4);">
    <h1>404</h1>
    <p>Esta página no existe.</p>
    <p><a href={home}>← Volver al inicio</a></p>
  </section>
</Base>
```

- [ ] **Step 2: Crear `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://felipendelicia.github.io/felipendelicia/sitemap-index.xml
```

- [ ] **Step 3: Crear `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0d0d0f"/>
  <text x="16" y="22" font-family="monospace" font-size="18" fill="#6ea8fe" text-anchor="middle">F</text>
</svg>
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: build exitoso. `dist/404.html`, `dist/robots.txt` y `dist/favicon.svg` presentes.

- [ ] **Step 5: Commit**

```bash
git add src/pages/404.astro public/robots.txt public/favicon.svg
git commit -m "feat: add 404 page, robots.txt and favicon"
```

---

### Task 11: README de perfil de GitHub

**Files:**
- Modify: `README.md` (reemplaza el actual)

**Interfaces:**
- Consumes: nada.
- Produces: `README.md` de perfil (se renderiza en `github.com/felipendelicia`). **No** es parte del build de Astro.

- [ ] **Step 1: Reemplazar `README.md`**

```md
# Hola, soy Felipe ✌️

Estudio Ingeniería Informática y me dedico al **desarrollo de software** y la **infraestructura TI**. Me gusta sentarme a escribir código, automatizar y mantener sistemas que no se caigan.

🌐 **Portafolio:** https://felipendelicia.github.io/felipendelicia/
📫 **Contacto:** delicia4581@gmail.com

---

### 📊 Stats

<p>
  <img alt="Lenguajes más usados" src="https://github-readme-stats.vercel.app/api/top-langs/?username=felipendelicia&layout=compact&theme=dark&hide_border=true" />
</p>
<p>
  <img alt="Streak" src="https://github-readme-streak-stats.herokuapp.com/?user=felipendelicia&theme=dark&hide_border=true" />
</p>
```

> Nota: el link al portafolio queda activo recién después del primer deploy (Task 12). Los widgets de stats cargan imágenes de servicios de terceros (vercel.app / herokuapp.com).

- [ ] **Step 2: Verificación visual**

Run: `git diff README.md`
Expected: el diff muestra el reemplazo del README minimalista por la versión nueva. Revisar que el username `felipendelicia` y el email sean correctos.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: rewrite profile README with intro, portfolio link and stats"
```

---

### Task 12: CI/CD — deploy a GitHub Pages

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: el proyecto Astro completo (build via `withastro/action`).
- Produces: workflow que en push a `main` buildea y despliega a GitHub Pages.

- [ ] **Step 1: Crear `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Build with Astro
        uses: withastro/action@v3
        with:
          node-version: 20

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Verificar el YAML localmente**

Run: `npm run build`
Expected: confirma que el build que correrá el workflow pasa localmente.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deploy workflow"
```

- [ ] **Step 4: Setup manual del repo (una vez, lo hace Felipe)**

En GitHub: **Settings → Pages → Build and deployment → Source = "GitHub Actions"** (no la rama `gh-pages`). Luego mergear la rama a `main` dispara el deploy. El sitio queda en `https://felipendelicia.github.io/felipendelicia/`.

---

## Self-Review

**1. Spec coverage:**
- Arquitectura (Astro SSG + TS strict, i18n, site/base) → Task 1. ✅
- Estructura de carpetas → Tasks 2-12 cubren cada path. ✅
- Modelo de contenido (Zod, experiencia/proyectos, subcarpetas por locale) → Task 3. ✅
- Páginas y flujo de datos (home + detalle, getStaticPaths, LanguagePicker) → Tasks 8-9 + 6. ✅
- Tema dark+light, anti-FOUC, persistencia → Tasks 4 (tokens), 5 (script inline), 6 (toggle). ✅
- Estilado CSS nativo + a11y (skip-link, focus, contraste, lang) → Tasks 4, 5, 6. ✅
- SEO (title/desc, OG, hreflang, canonical, sitemap, robots) → Tasks 1 (sitemap), 5 (meta/hreflang), 10 (robots). ✅
- Errores/edge cases (build fail-fast, 404, links opcionales) → Tasks 3, 10, 9. ✅
- Testing (vitest solo utils + astro check/build) → Task 2 + verificaciones en cada task. ✅
- CI/CD → Task 12. ✅
- README de perfil (requisito agregado) → Task 11. ✅
- Contacto links directos (mailto + GitHub) → Hero + Footer (Task 7). ✅

**2. Placeholder scan:** Sin "TODO/TBD" en pasos. El contenido `ejemplo.md` es contenido semilla real y válido (no placeholder de plan) que Felipe reemplazará con datos reales — está marcado como ejemplo en su cuerpo.

**3. Type consistency:**
- `getLocaleFromId` / `getSlugFromId` / `useTranslations` definidos en Task 2, usados con misma firma en Tasks 7, 8, 9. ✅
- `Base` props `{ locale, title, description, path? }` consistentes entre Tasks 5, 8, 9, 10. ✅
- `Nav` props `{ locale, path? }`, `LanguagePicker` `{ locale, path? }`, `ThemeToggle` `{ locale }` consistentes entre Tasks 6, 8, 9. ✅
- `getRelativeLocaleUrl` / `getAbsoluteLocaleUrl` de `astro:i18n` usados consistentemente. ✅

## Edge case conocido (documentado, no bloqueante)

Si un proyecto/experiencia existe en un solo idioma, el LanguagePicker apunta a `getRelativeLocaleUrl(otherLocale, 'proyectos/<slug>')`, que en detalle podría dar 404 si la traducción no existe. Mitigación recomendada al cargar contenido real: mantener archivos pareados en `es/` y `en/` (mismo nombre) según el constraint global. Si se decide permitir contenido no pareado, agregar en una iteración futura un fallback en el LanguagePicker que verifique existencia y caiga al home del otro idioma.
```
