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
    slug: 'therapy',
    name: 'Therapy',
    description:
      'Web app completa para consultorio de kinesiología traumatológica, pilates terapéutico y terapias wellness. Incluye sistema de turnos online con calendario interactivo, panel admin para gestión de pacientes y múltiples especialidades.',
    techs: ['Next.js', 'PostgreSQL', 'Better Auth', 'Drizzle', 'Tailwind CSS'],
    type: 'fullstack',
    mockupUrl: '/projects/project-03.svg',
    demoUrl: 'https://kinesio-seven.vercel.app/',
    githubUrl: 'https://github.com/TanitoCode/therapy',
    year: 2026,
  },
]
