'use client'

import { stackItems } from '@/lib/stack-data'
import { StackIcon } from '@/components/ui/stack-icon'
import { useReveal } from '@/hooks/use-reveal'

export function About() {
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="sobre-mi"
      aria-labelledby="about-heading"
      style={{
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="container">
        <div className="about-grid">

          {/* ── Left column — text + stat (5/12) ─────────── */}
          <div className={`about-text-col reveal-up${visible ? ' is-visible' : ''}`}>

            <h2
              id="about-heading"
              className="about-heading"
            >
              Sobre mí
            </h2>

            <div className="about-bio">
              <p>
                Soy Técnico en Programación y desarrollador Fullstack, con experiencia en
                desarrollo web, liderazgo técnico y automatización de procesos.
              </p>
              <p>
                Me enfoco en crear soluciones claras, funcionales y bien estructuradas,
                combinando programación, análisis de datos y mejora continua.
              </p>
            </div>

            {/* Stat destacado */}
            <div className="about-stat" aria-label="Técnico en Programación">
              <span className="about-stat-number">TC</span>
              <span className="about-stat-label">Técnico en Programación</span>
            </div>

          </div>

          {/* ── Right column — stack grid (7/12) ────────── */}
          <div className={`about-stack-col reveal-up reveal-delay-2${visible ? ' is-visible' : ''}`}>
            <p className="about-stack-label">Stack tecnológico</p>
            <ul className="about-stack-grid" role="list">
              {stackItems.map((item) => (
                <li key={item.slug} className="about-stack-item">
                  <span className="about-stack-icon" style={{ color: item.color }}>
                    <StackIcon slug={item.slug} name={item.name} size={28} />
                  </span>
                  <span className="about-stack-name">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      <style>{`
        /* ── Layout grid ─────────────────────────────── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
          width: 100%;
        }

        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 5fr 7fr;
            gap: var(--space-8);
            align-items: start;
          }
        }

        /* ── Left column ─────────────────────────────── */
        .about-text-col {
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
        }

        /* ── Heading ─────────────────────────────────── */
        .about-heading {
          font-family: var(--font-sans);
          font-size: var(--text-h2);
          font-weight: var(--font-weight-bold);
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-tight);
          color: var(--color-fg);
          margin: 0;
        }

        /* ── Bio paragraphs ──────────────────────────── */
        .about-bio {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .about-bio p {
          font-family: var(--font-sans);
          font-size: var(--text-body-lg);
          line-height: var(--leading-relaxed);
          color: var(--color-fg-muted);
          margin: 0;
          max-width: 52ch;
        }

        /* ── Stat ────────────────────────────────────── */
        .about-stat {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-border);
        }

        .about-stat-number {
          font-family: var(--font-sans);
          font-size: var(--text-display);
          font-weight: var(--font-weight-bold);
          letter-spacing: var(--tracking-display);
          line-height: var(--leading-none);
          color: var(--color-accent);
        }

        .about-stat-label {
          font-family: var(--font-sans);
          font-size: var(--text-small);
          font-weight: var(--font-weight-normal);
          color: var(--color-fg-muted);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
        }

        /* ── Right column ────────────────────────────── */
        .about-stack-col {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
          padding-top: 0;
        }

        @media (min-width: 768px) {
          .about-stack-col {
            padding-top: var(--space-1);
          }
        }

        /* ── Stack label ─────────────────────────────── */
        .about-stack-label {
          font-family: var(--font-sans);
          font-size: var(--text-small);
          font-weight: var(--font-weight-medium);
          color: var(--color-fg-subtle);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          margin: 0;
        }

        /* ── Stack grid ──────────────────────────────── */
        .about-stack-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-3);
          list-style: none;
          margin: 0;
          padding: 0;
        }

        /* ── Stack item ──────────────────────────────── */
        .about-stack-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-4) var(--space-2);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          cursor: default;
          transition: var(--transition-color), border-color var(--duration-fast) var(--ease-in-out);
        }

        .about-stack-item:hover {
          border-color: var(--color-accent-muted);
        }

        /* ── Stack icon ──────────────────────────────── */
        .about-stack-icon {
          color: var(--color-fg-muted);
          transition: var(--transition-color);
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        .about-stack-item:hover .about-stack-icon {
          color: var(--color-accent);
        }

        /* ── Stack name ──────────────────────────────── */
        .about-stack-name {
          font-family: var(--font-sans);
          font-size: var(--text-xs);
          font-weight: var(--font-weight-medium);
          color: var(--color-fg-muted);
          text-align: center;
          line-height: var(--leading-tight);
          transition: var(--transition-color);
        }

        .about-stack-item:hover .about-stack-name {
          color: var(--color-fg);
        }

        /* ── Mobile adjustments ──────────────────────── */
        @media (max-width: 767px) {
          .about-bio p {
            max-width: 100%;
          }

          .about-stat {
            padding-top: var(--space-3);
          }

          .about-stack-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: var(--space-2);
          }

          .about-stack-item {
            padding: var(--space-3) var(--space-1);
          }
        }

        @media (max-width: 400px) {
          .about-stack-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  )
}
