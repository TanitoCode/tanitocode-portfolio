'use client'

import { projects } from '@/lib/projects-data'
import type { Project } from '@/lib/projects-data'
import { useReveal } from '@/hooks/use-reveal'

function typeBadge(type: Project['type']) {
  if (type === 'frontend') {
    return {
      label: 'Frontend',
      style: {
        color: 'var(--color-accent)',
        backgroundColor: 'var(--color-accent-muted)',
      },
    }
  }
  if (type === 'fullstack') {
    return {
      label: 'Fullstack',
      style: {
        color: 'var(--color-success)',
        backgroundColor: 'rgba(22, 163, 74, 0.1)',
      },
    }
  }
  // backend
  return {
    label: 'Backend',
    style: {
      color: 'var(--color-fg-subtle)',
      backgroundColor: 'var(--color-surface-2)',
    },
  }
}

export function Projects() {
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="proyectos"
      aria-labelledby="projects-heading"
      style={{
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="container">
        <h2 id="projects-heading" className={`projects-heading reveal-up${visible ? ' is-visible' : ''}`}>
          Proyectos
        </h2>

        <ul className="projects-grid" role="list">
          {projects.map((project, index) => {
            const badge = typeBadge(project.type)
            const demoDisabled = project.demoUrl === '#'
            const githubDisabled = project.githubUrl === '#'

            return (
              <li
                key={project.slug}
                className={`project-card reveal-up reveal-delay-${Math.min(index + 1, 4)}${visible ? ' is-visible' : ''}`}
              >
                {/* Top row: badge + year */}
                <div className="project-card-header">
                  <span
                    className="project-badge"
                    style={badge.style}
                  >
                    {badge.label}
                  </span>
                  <span className="project-year">{project.year}</span>
                </div>

                {/* Content */}
                <div className="project-card-body">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-desc">{project.description}</p>
                </div>

                {/* Tech chips */}
                <ul className="project-techs" role="list" aria-label="Tecnologías">
                  {project.techs.map((tech) => (
                    <li key={tech} className="project-tech-chip">
                      {tech}
                    </li>
                  ))}
                </ul>

                {/* Links */}
                <div className="project-links">
                  <a
                    href={demoDisabled ? undefined : project.demoUrl}
                    className="project-link"
                    aria-disabled={demoDisabled}
                    style={demoDisabled ? { opacity: 0.4, pointerEvents: 'none' } : undefined}
                    {...(demoDisabled ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    Demo
                  </a>
                  <a
                    href={githubDisabled ? undefined : project.githubUrl}
                    className="project-link"
                    aria-disabled={githubDisabled}
                    style={githubDisabled ? { opacity: 0.4, pointerEvents: 'none' } : undefined}
                    {...(githubDisabled ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    GitHub
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <style>{`
        /* ── Section heading ─────────────────────────── */
        .projects-heading {
          font-family: var(--font-sans);
          font-size: var(--text-h2);
          font-weight: var(--font-weight-bold);
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-tight);
          color: var(--color-fg);
          margin: 0 0 var(--space-12) 0;
        }

        /* ── Grid ─────────────────────────────────────── */
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
          list-style: none;
          margin: 0;
          padding: 0;
        }

        @media (min-width: 640px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* ── Card ─────────────────────────────────────── */
        .project-card {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          padding: var(--space-6);
          background-color: var(--color-card-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-card);
          transition:
            background-color var(--duration-fast) var(--ease-in-out),
            border-color var(--duration-fast) var(--ease-in-out),
            transform var(--duration-base) var(--ease-out);
        }

        .project-card:hover {
          background-color: var(--color-surface-2);
          border-color: rgba(var(--color-accent-rgb), 0.3);
          transform: translateY(-2px);
        }

        /* ── Card header ──────────────────────────────── */
        .project-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── Badge ────────────────────────────────────── */
        .project-badge {
          display: inline-flex;
          align-items: center;
          padding: var(--space-1) var(--space-3);
          font-family: var(--font-sans);
          font-size: var(--text-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          border-radius: var(--radius-badge);
          line-height: 1.4;
        }

        /* ── Year ─────────────────────────────────────── */
        .project-year {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--color-fg-subtle);
        }

        /* ── Card body ────────────────────────────────── */
        .project-card-body {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          flex: 1;
        }

        /* ── Project name ─────────────────────────────── */
        .project-name {
          font-family: var(--font-sans);
          font-size: var(--text-h3);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-snug);
          color: var(--color-fg);
          margin: 0;
        }

        /* ── Project description ──────────────────────── */
        .project-desc {
          font-family: var(--font-sans);
          font-size: var(--text-body);
          line-height: var(--leading-relaxed);
          color: var(--color-fg-muted);
          margin: 0;
        }

        /* ── Tech chips ───────────────────────────────── */
        .project-techs {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .project-tech-chip {
          display: inline-flex;
          align-items: center;
          padding: 2px var(--space-2);
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--color-fg-subtle);
          background-color: var(--color-card-bg);
          border: 1px solid var(--color-border-subtle, var(--color-border));
          border-radius: 4px;
          line-height: 1.6;
        }

        /* ── Links row ────────────────────────────────── */
        .project-links {
          display: flex;
          gap: var(--space-3);
          padding-top: var(--space-2);
          border-top: 1px solid var(--color-border);
        }

        .project-link {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-sans);
          font-size: var(--text-small);
          font-weight: var(--font-weight-medium);
          color: var(--color-accent);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-in-out);
        }

        .project-link:hover {
          color: var(--color-accent-hover);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
      `}</style>
    </section>
  )
}
