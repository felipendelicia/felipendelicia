# Portafolio / CV online — Diseño

**Fecha:** 2026-06-23
**Repo:** `felipendelicia` (doble propósito: README de perfil de GitHub + esta web)
**Estado:** diseño aprobado, pendiente de implementación

## Propósito

Web de portafolio/CV online de Felipe que repasa su experiencia en desarrollo e
infraestructura TI. Audiencia mixta (reclutadores/RRHH y equipos técnicos): debe
leerse rápido como CV y, a la vez, permitir profundizar en proyectos técnicos.

## Decisiones tomadas

| Tema | Decisión |
|------|----------|
| Stack | Astro (SSG) + TypeScript strict |
| Idiomas | Bilingüe ES/EN con i18n nativo de Astro |
| Estructura | One-page (Hero → Experiencia → Proyectos) + páginas de detalle por proyecto |
| Contenido | Markdown en Content Collections, validado con Zod |
| Contacto | Links directos (email `mailto` + GitHub/LinkedIn). Sin form ni backend. Sin PDF. |
| Estética | Minimalista / limpio |
| Tema | Dark por defecto + toggle a light, con persistencia |
| Deploy | GitHub Pages vía GitHub Actions |

## 1. Arquitectura

- **Astro SSG + TypeScript strict.** Output 100% estático.
- **i18n nativo de Astro:** `defaultLocale: 'es'`, `locales: ['es', 'en']`,
  `routing.prefixDefaultLocale: false` → español en raíz (`/`), inglés en `/en/`.
- **Deploy:** GitHub Actions (`withastro/action`) → GitHub Pages.
  - `astro.config.mjs`: `site: 'https://felipendelicia.github.io'`, `base: '/felipendelicia'`.
  - **Gotcha:** este repo es `felipendelicia`, no `felipendelicia.github.io` → es *project page*,
    se sirve en `https://felipendelicia.github.io/felipendelicia/`. Sin `base` correcto, los assets dan 404.
- `README.md` del perfil queda intacto — el build no lo toca.

## 2. Estructura de carpetas

```
src/
  content/
    config.ts                  # schemas Zod de las colecciones
    experiencia/{es,en}/*.md
    proyectos/{es,en}/*.md
  i18n/
    ui.ts                      # strings de UI (nav, labels, aria) por idioma
    utils.ts                   # helpers: getLocale(url), localizar rutas, t()
  components/
    Hero.astro
    ExperienciaItem.astro
    ProyectoCard.astro
    Nav.astro
    Footer.astro
    LanguagePicker.astro
    ThemeToggle.astro
  layouts/
    Base.astro                 # <head>, SEO, lang, skip-link, script anti-FOUC del tema
  pages/
    index.astro                # ES one-page
    proyectos/[slug].astro
    en/index.astro             # EN one-page
    en/proyectos/[slug].astro
    404.astro
  styles/
    tokens.css                 # custom properties: colores (dark+light), espaciado, tipografía
    global.css                 # reset + base
public/
  favicon, og-image, assets estáticos
```

## 3. Modelo de contenido (Content Collections + Zod)

Definido en `src/content/config.ts`. El **locale se deriva de la subcarpeta** (`es`/`en`).
El **slug** sale del nombre de archivo.

### Colección `experiencia`
```ts
{
  empresa: string,
  rol: string,
  inicio: date,
  fin: date | null,        // null = "actualidad"
  orden: number,           // orden de aparición (desc por defecto)
  tags: string[],          // ej. ["AWS", "Docker", "TypeScript"]
}
```
Cuerpo markdown = logros / descripción del puesto.

### Colección `proyectos`
```ts
{
  titulo: string,
  resumen: string,         // 1-2 líneas para la card
  stack: string[],
  repo: string (url) | undefined,
  demo: string (url) | undefined,
  destacado: boolean,      // aparece en el grid del home
  orden: number,
  fecha: date,
}
```
Cuerpo markdown = descripción larga, renderizada en la página de detalle.

> **Pareo entre idiomas:** un mismo proyecto/experiencia usa el **mismo nombre de archivo**
> en `es/` y `en/` (mismo slug). Eso permite que el LanguagePicker linkee a la traducción equivalente.

## 4. Páginas y flujo de datos

- **`index.astro` / `en/index.astro`:**
  - `getCollection('experiencia', e => locale(e) === LOCALE)` ordenado por `orden`.
  - `getCollection('proyectos', p => locale(p) === LOCALE && p.data.destacado)` ordenado por `orden`.
  - Renderiza: `Hero` + lista de `ExperienciaItem` + grid de `ProyectoCard` (cada card linkea al detalle).
- **`proyectos/[slug].astro` / `en/proyectos/[slug].astro`:**
  - `getStaticPaths()` genera una ruta por proyecto del locale correspondiente.
  - Renderiza `<Content />` del markdown + metadata (stack, links repo/demo).
- Strings de UI desde `i18n/ui.ts` vía helper `t(locale, key)`.
- **`LanguagePicker`:** calcula la URL equivalente en el otro idioma a partir de la ruta actual
  (misma página/slug, distinto prefijo de locale).

## 5. Tema (dark por defecto + light)

- **Default dark.** Toggle a light mode mediante `ThemeToggle`.
- Tokens de color definidos para ambos temas en `tokens.css` (ej. `:root` = dark,
  `:root[data-theme="light"]` = light).
- **Persistencia:** preferencia guardada en `localStorage`.
- **Anti-FOUC:** script inline y bloqueante en `<head>` (en `Base.astro`) que setea
  `data-theme` antes del primer paint, leyendo `localStorage` y cayendo a dark por defecto.
- El toggle actualiza el atributo + `localStorage`. `<meta name="color-scheme">` acorde.

## 6. Estilado (enfoque A — CSS nativo, sin framework)

- CSS scoped de Astro por componente + `tokens.css` global con custom properties.
- Paleta minimalista: un acento, neutros para fondo/texto, definidos por tema.
- Tipografía: system font stack o **1 webfont self-hosted** (sin CDN de Google Fonts,
  por performance y privacidad). Decisión fina en la etapa de diseño frontend.
- Layout mobile-first, responsive.
- **Accesibilidad:** HTML semántico, skip-link, foco visible, contraste AA en ambos temas,
  `lang` correcto por página, `aria-label` en controles (toggle, language picker).

## 7. SEO

- `Base.astro`: `title`/`description` por página, Open Graph (+ `og-image`),
  `hreflang` es/en recíprocos, `canonical`.
- `@astrojs/sitemap` para el sitemap. `robots.txt` en `public/`.

## 8. Errores / edge cases

- Build **falla** si un frontmatter no cumple el schema Zod (fail-fast: nada roto en prod).
- `404.astro` propio (funciona en project page de GitHub Pages).
- Botones `repo`/`demo` se renderizan **sólo si** el campo existe (son opcionales).
- Si una experiencia/proyecto existe en un idioma pero no en el otro: el LanguagePicker
  cae al home de ese idioma en vez de a una ruta inexistente.

## 9. Testing (YAGNI — sitio estático chico)

- CI corre `astro check` (typecheck + validación de templates) y `astro build`
  (que valida los schemas Zod del contenido).
- **Sin** unit tests de componentes por ahora (no hay lógica compleja).
- Lighthouse CI / link-check se pueden sumar más adelante si hace falta.

## 10. CI/CD

- `.github/workflows/deploy.yml`: en push a `main` →
  `astro check` + `astro build` (vía `withastro/action`) → deploy a GitHub Pages.
- **Setup manual una vez:** en el repo, Settings → Pages → Source = **GitHub Actions**
  (no rama `gh-pages`).

## No-objetivos (fuera de scope)

- Formulario de contacto / backend.
- CV descargable en PDF.
- CMS headless.
- Blog.
- Analytics (se puede evaluar después).

## Comandos (una vez scaffoldeado con `npm create astro@latest`)

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → ./dist
npm run preview
npx astro check    # typecheck + validación de contenido
```
