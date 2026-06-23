---
titulo: "obsidian-notes — Publish from Obsidian"
resumen: "A pipeline that turns selected notes from an Obsidian vault into a website: it transforms wikilinks, renders code and math, and deploys on Netlify."
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

**obsidian-notes** publishes the notes I choose from an **Obsidian** vault as a website — a *digital garden*. I mark a note with `publish: true` in its frontmatter and it goes online; everything else stays private.

### How it works

- **`sync-notes.sh`** reads the vault (`VAULT_PATH`), finds `.md` files with `publish: true` and copies those notes and their images into the project.
- At build time, **Vite** imports every note with `import.meta.glob`.
- **`NoteRenderer`** translates Obsidian wikilinks —`[[Note]]` into React Router links and `![[img.png]]` into `<img>`— before handing the markdown to **react-markdown**.
- Rich rendering: **GFM**, **code via highlight.js** and **math via KaTeX** (rehype/remark).

### How it's built

- **React + Vite + React Router** (static SPA). Consistent slugs with `github-slugger`.
- **Netlify deploy:** the build runs `sync-notes.sh && vite build`. If the vault lives in a private repo, it's cloned at build time with a token — the content is never committed to the public repo.
- No server of its own: it's 100% static.
