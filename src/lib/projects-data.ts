export interface Project {
  slug: string
  name: string
  description: string
  techs: string[]
  type: 'frontend' | 'fullstack' | 'backend'
  mockupUrl: string
  demoUrl: string
  githubUrl: string
  year: number
}

export const projects: Project[] = [
  {
    slug: 'ticket-property',
    name: 'Ticket-Property',
    description:
      'Sistema fullstack de gestión de tickets y análisis automático de propiedades. Scraping de Booking y Airbnb, comparativas competitivas y reportes con colas de procesamiento asíncrono.',
    techs: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    type: 'fullstack',
    mockupUrl: '/projects/project-01.svg',
    demoUrl: '#',
    githubUrl: 'https://github.com/maximosatj/Ticket-Property',
    year: 2026,
  },
  {
    slug: 'instrucciones-ar-vacations',
    name: 'AR Vacaciones — Instrucciones',
    description:
      'Generador visual de páginas de instrucciones para huéspedes. Soporte bilingüe (ES/EN), switch de idioma flotante, diseño mobile-first y exportación a HTML listo para publicar.',
    techs: ['HTML', 'CSS', 'JavaScript'],
    type: 'frontend',
    mockupUrl: '/projects/project-02.svg',
    demoUrl: '#',
    githubUrl: 'https://github.com/TanitoCode/instrucciones-ar-vacations',
    year: 2025,
  },
  {
    // TODO: reemplazar por tercer proyecto real
    slug: 'proximo-proyecto',
    name: 'Próximo proyecto',
    description:
      'Proyecto en desarrollo. Pronto disponible con descripción, stack y links reales.',
    techs: ['TypeScript', 'React'],
    type: 'fullstack',
    mockupUrl: '/projects/project-03.svg',
    demoUrl: '#',
    githubUrl: '#',
    year: 2026,
  },
]
