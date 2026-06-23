---
titulo: "LPDG — Los pibes de Gerli"
resumen: "Sitio del grupo de amigos de Gerli: una portada que cambia con cada juntada y archiva las anteriores. Estático, brutalista/editorial, PWA."
stack:
  - "HTML"
  - "CSS"
  - "JavaScript"
  - "Sin framework"
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
    alt: "Archivo de portadas: cada vez que la página cambia de cara, la anterior queda guardada"
  - src: ../../../assets/proyectos/lpdg/gianni.png
    alt: "Una portada vieja archivada (el cumple de Gianni), con identidad propia"
---

**LPDG** es el sitio de "Los pibes de Gerli", mi grupo de amigos. Es un proyecto **creativo y de diseño**: la **portada cambia con cada juntada** —con un contador que corre desde la última— y, cada vez que cambia, la anterior **queda archivada y navegable**. Así el sitio se vuelve una colección de tapas, cada una con su propia identidad.

### Diseño

Estética **brutalista / editorial** (inspirada en Under Club): negro puro, alto contraste, **tipografía bold mayúscula enorme** (Syne) con citas en *Instrument Serif* itálica, acento verde, grano tipo foto y wordmark propio **vectorizado a paths**.

### Cómo está hecho

- **HTML/CSS/JS vanilla, sin framework ni build** — todo el peso está en el diseño y el detalle.
- **Sistema visual compartido** en un único `styles.css` (tokens de color, fuentes y primitivas reutilizables); cada portada agrega solo su layout.
- **PWA instalable** (manifest + service worker) y deploy estático en **GitHub Pages**.
- Detalles a mano: contador en vivo desde un ancla fija, reveal on scroll con `IntersectionObserver` y previews del archivo escaladas con JS.
