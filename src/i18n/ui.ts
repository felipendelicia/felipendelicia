export const ui = {
  es: {
    'site.title': 'Felipe — Desarrollo e Infraestructura TI',
    'site.description':
      'Portafolio de Felipe: desarrollo de software e infraestructura TI.',
    'nav.experiencia': 'Experiencia',
    'nav.proyectos': 'Proyectos',
    'nav.contacto': 'Contacto',
    'hero.titulo': 'Hola, soy Felipe',
    'hero.subtitulo': 'Desarrollo de software e infraestructura TI.',
    'experiencia.actualidad': 'Actualidad',
    'proyectos.verRepo': 'Código',
    'proyectos.verDemo': 'Demo',
    'proyectos.volver': '← Volver',
    'a11y.skip': 'Saltar al contenido',
    'a11y.tema': 'Cambiar tema claro/oscuro',
    'a11y.idioma': 'Cambiar idioma',
  },
  en: {
    'site.title': 'Felipe — Software & IT Infrastructure',
    'site.description':
      "Felipe's portfolio: software development and IT infrastructure.",
    'nav.experiencia': 'Experience',
    'nav.proyectos': 'Projects',
    'nav.contacto': 'Contact',
    'hero.titulo': "Hi, I'm Felipe",
    'hero.subtitulo': 'Software development and IT infrastructure.',
    'experiencia.actualidad': 'Present',
    'proyectos.verRepo': 'Code',
    'proyectos.verDemo': 'Demo',
    'proyectos.volver': '← Back',
    'a11y.skip': 'Skip to content',
    'a11y.tema': 'Toggle light/dark theme',
    'a11y.idioma': 'Change language',
  },
} as const;

export type UIKey = keyof (typeof ui)['es'];
