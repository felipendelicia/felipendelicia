---
titulo: "LPDG — Los pibes de Gerli"
resumen: "A site for my Gerli friends group: a cover that changes with every meetup and archives the previous ones. Static, brutalist/editorial, PWA."
stack:
  - "HTML"
  - "CSS"
  - "JavaScript"
  - "No framework"
  - "PWA"
  - "GitHub Pages"
repo: "https://github.com/felipendelicia/LPDG"
demo: "https://felipendelicia.github.io/LPDG/"
destacado: true
orden: 5
fecha: 2026-06-07
cover: ../../../assets/proyectos/lpdg/home.png
galeria:
  - src: ../../../assets/proyectos/lpdg/archivo.png
    alt: "Cover archive: each time the page changes face, the previous one is kept"
  - src: ../../../assets/proyectos/lpdg/gianni.png
    alt: "An archived old cover (Gianni's birthday) with its own identity"
---

**LPDG** is the site for "Los pibes de Gerli", my group of friends. It's a **creative, design-driven** project: the **cover changes with every meetup** —with a counter running since the last one— and, each time it changes, the previous cover is **archived and stays browsable**. Over time the site becomes a collection of covers, each with its own identity.

### Design

A **brutalist / editorial** aesthetic (inspired by Under Club): pure black, high contrast, **huge bold uppercase type** (Syne) with *Instrument Serif* italic quotes, a green accent, photo grain and a custom wordmark **vectorized to paths**.

### How it's built

- **Vanilla HTML/CSS/JS, no framework, no build** — all the weight is in the design and the details.
- A **shared visual system** in a single `styles.css` (color tokens, fonts and reusable primitives); each cover only adds its own layout.
- **Installable PWA** (manifest + service worker), static deploy on **GitHub Pages**.
- Hand-built details: a live counter from a fixed anchor, scroll reveals with `IntersectionObserver`, and archive previews scaled with JS.
