---
titulo: "Luca Journey — Python with Pokémon"
resumen: "An interactive course to learn Linux and Python from scratch, Pokémon-themed, with real Python running 100% in the browser."
stack:
  - "Astro"
  - "TypeScript"
  - "Pyodide (Python/WASM)"
  - "NestJS"
  - "Prisma"
  - "PostgreSQL"
  - "Docker"
  - "Socket.IO"
  - "Raspberry Pi"
  - "PWA"
repo: "https://github.com/felipendelicia/luca-journey"
demo: "https://felipendelicia.github.io/luca-journey/"
destacado: true
orden: 1
fecha: 2026-06-04
cover: ../../../assets/proyectos/luca-journey/home.png
galeria:
  - src: ../../../assets/proyectos/luca-journey/libro.png
    alt: "The interactive book: Linux and Python theory with runnable examples and quizzes"
  - src: ../../../assets/proyectos/luca-journey/ejercicios.png
    alt: "Live exercises, graded with real pytest in the browser"
  - src: ../../../assets/proyectos/luca-journey/pokedex.png
    alt: "The Pokédex: a collection with levels, evolution and stats"
---

**Luca Journey** is an interactive course to learn **Linux and Python from scratch**, **Pokémon**-themed and in (Argentine) Spanish, built for absolute beginners. It runs **100% in the browser** — nothing to install.

Python code actually executes thanks to **Pyodide** (CPython compiled to WebAssembly). Exercises are graded with **real pytest** in the browser, and when something fails it **translates the Python error into plain Spanish** —cause and how to fix it— plus a test hint without spoiling the solution.

On top of that sits a full game layer: a **League** with XP, levels and badges earned by beating gym leaders; a **Safari** to catch Pokémon; a GO-style **Pokédex** with animated evolution; turn-based **battles** with types and status effects, including **live PvP with ELO ranking**; a shop, community challenges and trades.

**By the numbers:** 9 regions (gen 1–9), 77 chapters, 417 exercises across 72 topics, 81 capstone projects and 1025 Pokémon.

### How it's built

- **Frontend:** Astro as a static site on GitHub Pages, **Pyodide** to run Python, **CodeMirror** as the editor, and a **service worker** that caches Pyodide and sprites → fast loads and partial **offline** use (installable PWA).
- **Self-hosted backend:** **NestJS + Prisma + PostgreSQL** in Docker, running on a **Raspberry Pi** on my network. **Google OAuth → JWT** auth, cloud progress sync, and **socket.io** for live PvP and friend presence.
- **Works server-less too:** without a session, everything is stored in `localStorage` (local-only mode).
- **Tests:** unit tests with **Jest** (battle engine and collection) and end-to-end with **Playwright**.
