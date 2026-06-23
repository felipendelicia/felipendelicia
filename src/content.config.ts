import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const experiencia = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experiencia' }),
  schema: z.object({
    empresa: z.string(),
    rol: z.string(),
    inicio: z.coerce.date(),
    fin: z.coerce.date().nullable(),
    orden: z.number(),
    tags: z.array(z.string()).default([]),
  }),
});

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      resumen: z.string(),
      stack: z.array(z.string()).default([]),
      repo: z.string().url().optional(),
      demo: z.string().url().optional(),
      destacado: z.boolean().default(false),
      orden: z.number(),
      fecha: z.coerce.date(),
      cover: image().optional(),
      terminal: z.boolean().default(false),
      galeria: z.array(z.object({ src: image(), alt: z.string() })).default([]),
    }),
});

export const collections = { experiencia, proyectos };
