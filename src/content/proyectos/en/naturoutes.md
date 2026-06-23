---
titulo: "naturoutes — Route planner"
resumen: "A bike & walking route planner on a map: automatic routing with elevation profile, 100% in the browser and an offline PWA."
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
    alt: "Map of Bariloche and Nahuel Huapi with the terrain layer"
  - src: ../../../assets/proyectos/naturoutes/detalle.png
    alt: "Close-up of a route drawn over the streets, with POIs"
---

**naturoutes** plans **bike and walking** routes on a map. It's a **100% front-end, no-backend** web app: all logic runs in the browser, it's **mobile-first** and installable as a **PWA** (with offline use).

### What it does

- **Mixed routing:** automatic via **BRouter** (bike / MTB / walk profiles, with alternative routes and a straight-line fallback) or manual with reorderable waypoints.
- **Interactive elevation profile**, distance, estimated time and surface type (% paved). Hovering the profile marks the point on the map.
- **Switchable layers:** street, satellite, terrain and bike lanes.
- **Tools:** record your track with **GPS** (tracking + stats), compass, distance measuring and radius circles.
- **POIs** (water, refuges, bike) via **Overpass** and **place search** with **Nominatim**, sorted by distance.
- **Local storage** in **IndexedDB**, **GPX/KML export/import**, "Open in Google Maps" and **per-area map download** for offline use.

### How it's built

- **Next.js 16** (App Router, `output: 'export'`) + **React 19** + **TypeScript strict** + **Tailwind v4**.
- Map with **Leaflet + react-leaflet** and **OpenStreetMap** tiles (no tokens or accounts).
- **No backend, no secrets:** public APIs (BRouter, Nominatim, Overpass) are called straight from the browser, and everything tolerates failure/offline. Static deploy on **GitHub Pages**.
