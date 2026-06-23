---
titulo: "Julieta — Blog de cocina"
resumen: "Blog de cocina a medida para mi hermana: publica y edita recetas sola, con SEO de primera y un admin protegido por RLS."
stack:
  - "Next.js"
  - "React"
  - "TypeScript"
  - "Supabase"
  - "PostgreSQL"
  - "Tailwind CSS"
  - "Zod"
  - "Vercel"
repo: "https://github.com/felipendelicia/julieta"
demo: "https://julieta.ar"
destacado: true
orden: 2
fecha: 2026-06-08
cover: ../../../assets/proyectos/julieta/home.png
galeria:
  - src: ../../../assets/proyectos/julieta/receta.png
    alt: "Página de receta: meta strip (prep/cocción/porciones), foto hero e ingredientes"
  - src: ../../../assets/proyectos/julieta/recetas.png
    alt: "Listado de recetas con filtros por categoría, dificultad y tiempo"
  - src: ../../../assets/proyectos/julieta/deldia.png
    alt: "«Del día a día»: el blog de historias de cocina"
---

**Julieta** es el blog de cocina de mi hermana —ella es la "clienta" real—: recetas de temporada, historias del día a día y muchas fotos. El requisito clave era que pudiera **publicar y editar todo sola**, sin tocar código.

Es un sitio **a medida** (se descartó WordPress / no-code): **Next.js (App Router) + Supabase + Tailwind**, con deploy en **Vercel** y dominio propio.

### Qué hace

- **Recetas públicas** renderizadas en el servidor (SSG/ISR) con un layout editorial: *meta strip* (preparación, cocción, porciones, dificultad), ingredientes con checkboxes y pasos numerados con fotos.
- **Categorías, «del día a día» (blog), buscador y guardados.**
- **Panel `/admin` de una sola usuaria:** solo Julieta loguea (Supabase Auth), protegido con **middleware de Next + Row Level Security de Postgres**. Hace CRUD de recetas y posts y **sube fotos a Supabase Storage** — gestiona todo el contenido sin tocar el código.
- **SEO de primera:** **JSON-LD `Recipe`** por receta, OG/meta por página, `sitemap.xml` e imágenes optimizadas con `next/image`.

### Stack

Next.js + React + TypeScript, Supabase (Postgres + Auth + Storage), Tailwind, validación con Zod y tests con Vitest. Identidad visual cálida y rústica hecha a mano.
