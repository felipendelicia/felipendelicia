---
titulo: "Julieta — Cooking Blog"
resumen: "A custom cooking blog for my sister: she publishes and edits recipes herself, with first-class SEO and an admin locked down by RLS."
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
    alt: "Recipe page: meta strip (prep/cook/servings), hero photo and ingredients"
  - src: ../../../assets/proyectos/julieta/recetas.png
    alt: "Recipe index with filters by category, difficulty and time"
  - src: ../../../assets/proyectos/julieta/deldia.png
    alt: "“Del día a día”: the cooking-stories blog"
---

**Julieta** is my sister's cooking blog —she's the real "client"—: seasonal recipes, day-to-day stories and lots of photos. The key requirement was that she could **publish and edit everything herself**, without touching code.

It's a **bespoke** site (WordPress / no-code were ruled out): **Next.js (App Router) + Supabase + Tailwind**, deployed on **Vercel** with its own domain.

### What it does

- **Public recipe pages** rendered on the server (SSG/ISR) with an editorial layout: a *meta strip* (prep, cook, servings, difficulty), checkbox ingredients and numbered steps with photos.
- **Categories, a “día a día” blog, search and saved recipes.**
- **Single-user `/admin`:** only Julieta logs in (Supabase Auth), protected by **Next middleware + Postgres Row Level Security**. She does CRUD on recipes and posts and **uploads photos to Supabase Storage** — managing all content without touching code.
- **First-class SEO:** **`Recipe` JSON-LD** per recipe, per-page OG/meta, `sitemap.xml` and images optimized with `next/image`.

### Stack

Next.js + React + TypeScript, Supabase (Postgres + Auth + Storage), Tailwind, Zod validation and Vitest tests. A warm, rustic visual identity built by hand.
