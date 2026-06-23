---
titulo: "obsidian-notes — Publicar desde Obsidian"
resumen: "Pipeline que convierte notas marcadas de una bóveda de Obsidian en un sitio web: transforma wikilinks, renderiza código y matemática, y deploya en Netlify."
stack:
  - "React"
  - "Vite"
  - "React Router"
  - "react-markdown"
  - "KaTeX"
  - "highlight.js"
  - "Bash"
  - "Netlify"
repo: "https://github.com/felipendelicia/obsidian-notes"
destacado: true
orden: 6
fecha: 2026-04-16
diagram: true
---

**obsidian-notes** publica como sitio web las notas que yo elijo de una bóveda de **Obsidian** — un *digital garden*. Marco una nota con `publish: true` en el frontmatter y aparece online; el resto queda privado.

### Cómo funciona

- **`sync-notes.sh`** lee la bóveda (`VAULT_PATH`), busca los `.md` con `publish: true` y copia esas notas y sus imágenes al proyecto.
- En el build, **Vite** importa todas las notas con `import.meta.glob`.
- **`NoteRenderer`** traduce los wikilinks de Obsidian —`[[Nota]]` a links de React Router y `![[img.png]]` a `<img>`— antes de pasar el markdown a **react-markdown**.
- Renderizado rico: **GFM**, **código con highlight.js** y **matemática con KaTeX** (rehype/remark).

### Cómo está hecho

- **React + Vite + React Router** (SPA estática). Slugs consistentes con `github-slugger`.
- **Deploy en Netlify:** el build corre `sync-notes.sh && vite build`. Si la bóveda vive en un repo privado, se clona en el build con un token — el contenido nunca se commitea al repo público.
- Cero servidor propio: es 100% estático.
