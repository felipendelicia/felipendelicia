# felipendelicia

Repo de doble propósito: (1) el `README.md` es el perfil de GitHub de Felipe (el repo se llama igual que el usuario, por eso GitHub lo renderiza en el perfil), y (2) una web de portafolio/CV online sobre su experiencia en desarrollo e infraestructura TI.

> **Estado:** sitio Astro scaffoldeado y deployado en GitHub Pages. Contenido en colecciones (`src/content/experiencia`, `src/content/proyectos`), bilingüe es/en.

## Stack
- **Astro + TypeScript** para la web de portafolio.
- Deploy en **GitHub Pages** vía GitHub Actions.

## Comandos
```bash
npm install        # dependencias
npm run dev        # servidor local (http://localhost:4321)
npm run build      # build prod → ./dist
npm run preview    # previsualizar el build
```

## Convenciones
- Contenido y copy en **español**, mismo tono cercano que el README actual.
- `README.md` es el perfil de GitHub: editarlo solo para el perfil, NO mezclarlo con contenido del sitio.
- TypeScript estricto. Markup en componentes `.astro`; islas (React/Vue/etc.) solo si hace falta interactividad real.

## CV (LaTeX)
- Vive en `cv/`, en LaTeX, se compila con `pdflatex` (Overleaf o `texlive`). Paquetes: `lato`, `fontawesome5`, `babel-spanish`, `titlesec`, `enumitem`, `microtype`.
- **Nombre con fecha:** `cv-felipe-delicia-AAAA-MM-DD.tex`, con la fecha del día en que se regenera. El archivo con la **fecha más reciente es el vigente**; al actualizar, crear uno nuevo con la fecha de hoy y borrar el anterior.
- **Mantenerlo en sync:** cada vez que cambie la experiencia o se agreguen proyectos destacados, regenerar el CV. Fuente de verdad del contenido: las colecciones `experiencia` y `proyectos` del sitio + el perfil de GitHub (`felipendelicia` y org `reboot-argentina`).
- Español por defecto, mismo tono que el sitio. Los datos que no estén en el repo van marcados con la macro `\PH{...}` hasta que Felipe los complete.
- **Bilingüe:** la versión en inglés lleva sufijo `-en` (`cv-felipe-delicia-AAAA-MM-DD-en.tex`, con `babel english`). Mantener ambas en sync.
- **Descarga en el sitio:** el botón "Descargar CV" (Hero + Footer) sirve copias estables desde `public/cv-felipe-delicia.pdf` y `public/cv-felipe-delicia-en.pdf`. Tras regenerar el CV, **copiar el último PDF a `public/`** con esos nombres (sin fecha) para no romper el link. La descarga es por idioma (`locale === 'en'` → `-en`).

## Gotchas
- **Pages = project page, no user page.** Este repo es `felipendelicia`, no `felipendelicia.github.io`. El sitio se sirve en `https://felipendelicia.github.io/felipendelicia/`, así que en `astro.config.mjs` hay que setear `site: 'https://felipendelicia.github.io'` y `base: '/felipendelicia'` o los assets dan 404.
- El sitio de Pages NO reemplaza el README del perfil: el README se sigue mostrando en el perfil de GitHub aunque el repo tenga la web.
- En GitHub Pages configurar el source como **"GitHub Actions"** (no rama `gh-pages`), usando el workflow oficial `withastro/action`.
