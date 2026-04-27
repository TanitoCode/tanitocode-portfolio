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

// TODO: reemplazar por proyectos reales
export const projects: Project[] = [
  {
    slug: 'devflow',
    name: 'DevFlow',
    description:
      'Plataforma de gestión de tareas y sprints para equipos de desarrollo. Tablero kanban, métricas de velocidad y reportes automatizados.',
    techs: ['React', 'Next.js', 'PostgreSQL', 'Drizzle'],
    type: 'fullstack',
    mockupUrl: '/projects/project-01.svg',
    demoUrl: '#',
    githubUrl: '#',
    year: 2025,
  },
  {
    slug: 'logstream',
    name: 'LogStream API',
    description:
      'API de ingesta y análisis de logs en tiempo real. Endpoints REST con autenticación JWT, filtros por nivel y exportación a CSV.',
    techs: ['Node.js', 'PostgreSQL', 'Hono', 'TypeScript'],
    type: 'backend',
    mockupUrl: '/projects/project-02.svg',
    demoUrl: '#',
    githubUrl: '#',
    year: 2025,
  },
  {
    slug: 'components-lab',
    name: 'Components Lab',
    description:
      'Librería de componentes UI accesibles con Storybook. Incluye tokens de diseño, dark mode, y cobertura de tests >95%.',
    techs: ['React', 'TypeScript', 'Tailwind CSS'],
    type: 'frontend',
    mockupUrl: '/projects/project-03.svg',
    demoUrl: '#',
    githubUrl: '#',
    year: 2026,
  },
]
