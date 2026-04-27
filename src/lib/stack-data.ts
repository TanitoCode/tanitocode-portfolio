export interface StackItem {
  name: string
  slug: string
  color: string
}

export const stackItems: StackItem[] = [
  { name: 'React',       slug: 'react',       color: 'var(--color-fg-muted)' },
  { name: 'Next.js',     slug: 'nextdotjs',   color: 'var(--color-fg-muted)' },
  { name: 'TypeScript',  slug: 'typescript',  color: 'var(--color-fg-muted)' },
  { name: 'JavaScript',  slug: 'javascript',  color: 'var(--color-fg-muted)' },
  { name: 'Node.js',     slug: 'nodedotjs',   color: 'var(--color-fg-muted)' },
  { name: 'Bootstrap',   slug: 'bootstrap',   color: 'var(--color-fg-muted)' },
  { name: 'MySQL',       slug: 'mysql',       color: 'var(--color-fg-muted)' },
  { name: 'Power BI',    slug: 'powerbi',     color: 'var(--color-fg-muted)' },
  { name: 'Apps Script', slug: 'googleapps',  color: 'var(--color-fg-muted)' },
  { name: 'Git',         slug: 'git',         color: 'var(--color-fg-muted)' },
]
