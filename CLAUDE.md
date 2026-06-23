# felipendelicia

Repo de doble propósito: (1) el `README.md` es el perfil de GitHub de Felipe (el repo se llama igual que el usuario, por eso GitHub lo renderiza en el perfil), y (2) una web de portafolio/CV online sobre su experiencia en desarrollo e infraestructura TI.

> **Estado: greenfield.** La web todavía no fue scaffoldeada. Los comandos de abajo aplican una vez creado el proyecto con `npm create astro@latest`.

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

## Gotchas
- **Pages = project page, no user page.** Este repo es `felipendelicia`, no `felipendelicia.github.io`. El sitio se sirve en `https://felipendelicia.github.io/felipendelicia/`, así que en `astro.config.mjs` hay que setear `site: 'https://felipendelicia.github.io'` y `base: '/felipendelicia'` o los assets dan 404.
- El sitio de Pages NO reemplaza el README del perfil: el README se sigue mostrando en el perfil de GitHub aunque el repo tenga la web.
- En GitHub Pages configurar el source como **"GitHub Actions"** (no rama `gh-pages`), usando el workflow oficial `withastro/action`.
