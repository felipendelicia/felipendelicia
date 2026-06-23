---
titulo: "naturoutes — Planificador de rutas"
resumen: "Planificador de rutas de bici y caminata sobre mapa: ruteo automático con perfil de elevación, 100% en el navegador y PWA offline."
stack:
  - "Next.js"
  - "React"
  - "TypeScript"
  - "Tailwind CSS"
  - "Leaflet / OSM"
  - "BRouter"
  - "IndexedDB"
  - "PWA"
repo: "https://github.com/felipendelicia/naturoutes"
demo: "https://felipendelicia.github.io/naturoutes/"
destacado: true
orden: 4
fecha: 2026-06-18
cover: ../../../assets/proyectos/naturoutes/cover.png
galeria:
  - src: ../../../assets/proyectos/naturoutes/mapa.png
    alt: "Mapa de Bariloche y el Nahuel Huapi con capa de relieve"
  - src: ../../../assets/proyectos/naturoutes/detalle.png
    alt: "Detalle de una ruta trazada sobre las calles, con POIs"
---

**naturoutes** planifica rutas de **bici y caminata** sobre un mapa. Es una web **100% front, sin backend**: toda la lógica corre en el navegador, y es **mobile-first** e instalable como **PWA** (con uso offline).

### Qué hace

- **Trazado mixto:** automático vía **BRouter** (perfiles bici / MTB / caminar, con rutas alternativas y fallback a línea recta) o manual con waypoints reordenables.
- **Perfil de elevación interactivo**, distancia, tiempo estimado y % de superficie (asfalto). El hover sobre el perfil marca el punto en el mapa.
- **Capas conmutables:** calle, satélite, relieve y ciclovías.
- **Herramientas:** grabar tu recorrido con **GPS** (tracking + stats), brújula, medir distancia y círculos de radio.
- **POIs** (agua, refugios, bici) vía **Overpass** y **búsqueda de lugares** con **Nominatim**, ordenada por distancia.
- **Guardado local** en **IndexedDB**, **export/import GPX/KML**, "Abrir en Google Maps" y **descarga de mapas por zona** para uso offline.

### Cómo está hecho

- **Next.js 16** (App Router, `output: 'export'`) + **React 19** + **TypeScript strict** + **Tailwind v4**.
- Mapa con **Leaflet + react-leaflet** y tiles de **OpenStreetMap** (sin tokens ni cuentas).
- **Cero backend ni secretos:** las APIs públicas (BRouter, Nominatim, Overpass) se llaman directo desde el navegador, y todo tolera fallo/offline. Deploy estático en **GitHub Pages**.
