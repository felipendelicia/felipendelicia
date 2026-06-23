---
titulo: "Luca Journey — Python con Pokémon"
resumen: "Curso interactivo para aprender Linux y Python desde cero, con temática Pokémon y Python real corriendo 100% en el navegador."
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
    alt: "El libro interactivo: teoría de Linux y Python con ejemplos ejecutables y quizzes"
  - src: ../../../assets/proyectos/luca-journey/ejercicios.png
    alt: "Ejercicios en vivo, corregidos con pytest real en el navegador"
  - src: ../../../assets/proyectos/luca-journey/pokedex.png
    alt: "La Pokédex: colección con niveles, evolución y estadísticas"
---

**Luca Journey** es un curso interactivo para aprender **Linux y Python desde cero**, con temática **Pokémon** y en español argentino, pensado para principiantes absolutos. Todo corre **100% en el navegador**: no hay que instalar nada.

El código Python se ejecuta de verdad gracias a **Pyodide** (CPython compilado a WebAssembly). Los ejercicios se corrigen con **pytest real** en el navegador y, cuando algo falla, **traduzco el error de Python al español** —con la causa y cómo arreglarlo— más una pista del test sin spoilear la solución.

Sobre esa base hay una capa de juego completa: una **Liga** con experiencia, niveles y medallas venciendo a líderes de gimnasio; un **Safari** para atrapar Pokémon; una **Pokédex** estilo GO con evolución animada; **batallas por turnos** con tipos y estados, incluyendo **PvP en vivo con ranking ELO**; tienda, desafíos de la comunidad e intercambios.

**En números:** 9 regiones (gen 1–9), 77 capítulos, 417 ejercicios en 72 temas, 81 proyectos integradores y 1025 Pokémon.

### Cómo está hecho

- **Frontend:** Astro como sitio estático en GitHub Pages, **Pyodide** para correr Python, **CodeMirror** como editor y un **service worker** que cachea Pyodide y sprites → carga rápida y uso parcial **offline** (PWA instalable).
- **Backend self-hosted:** **NestJS + Prisma + PostgreSQL** en Docker, corriendo en una **Raspberry Pi** en mi red. Auth con **Google OAuth → JWT**, sincronización de progreso en la nube y **socket.io** para el PvP en vivo y la presencia de amigos.
- **Sin servidor también funciona:** sin sesión, todo se guarda en `localStorage` (modo solo-local).
- **Tests:** unitarios con **Jest** (motor de combate y colección) y end-to-end con **Playwright**.
