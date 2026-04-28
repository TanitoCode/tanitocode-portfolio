export function Hero() {
  return (
    <section
      aria-label="Presentación"
      style={{
        minHeight: 'calc(100vh - 3.5rem)',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '15vh',
        paddingBottom: 'var(--space-16)',
      }}
    >
      <div className="container">
        <div className="hero-grid">
          {/* Left column — text block (7/12) */}
          <div className="hero-text">
            <h1 className="hero-name">
              Mario Cristian Sanchez
            </h1>

            <h2 className="hero-title">
              Desarrollador{' '}
              <span style={{ color: 'var(--color-accent)' }}>Fullstack</span>
            </h2>

            <p className="hero-desc">
              Técnico en Programación y desarrollador Fullstack con experiencia en desarrollo web,
              liderazgo técnico y automatización de procesos.
            </p>

            <div className="hero-ctas">
              <a
                href="#proyectos"
                className="btn-primary"
              >
                Ver proyectos
              </a>
              <a
                href="/contacto"
                className="btn-secondary"
              >
                Contactame
              </a>
            </div>
          </div>

          {/* Right column — negative space with subtle decoration (5/12) */}
          <div className="hero-aside" aria-hidden="true">
            <div className="hero-deco-line" />
            <span className="hero-deco-number">{'{}'}</span>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Grid ─────────────────────────────────────── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
          width: 100%;
        }

        @media (min-width: 768px) {
          .hero-grid {
            grid-template-columns: 7fr 5fr;
            align-items: center;
            gap: var(--space-8);
          }
        }

        /* ── Text block ───────────────────────────────── */
        .hero-text {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        /* ── Name ─────────────────────────────────────── */
        .hero-name {
          font-family: var(--font-sans);
          font-size: var(--text-display);
          font-weight: var(--font-weight-bold);
          letter-spacing: var(--tracking-display);
          line-height: var(--leading-display);
          color: var(--color-fg);
          margin: 0;

          animation: fadeInUp var(--duration-slow) var(--ease-out) both;
          animation-delay: 0ms;
        }

        /* ── Title ────────────────────────────────────── */
        .hero-title {
          font-family: var(--font-sans);
          font-size: var(--text-h2);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-snug);
          color: var(--color-fg);
          margin: 0;

          animation: fadeInUp var(--duration-slow) var(--ease-out) both;
          animation-delay: var(--stagger-delay);
        }

        /* ── Description ──────────────────────────────── */
        .hero-desc {
          font-family: var(--font-sans);
          font-size: var(--text-body-lg);
          line-height: var(--leading-relaxed);
          color: var(--color-fg-muted);
          max-width: 55ch;
          margin: 0;

          animation: fadeInUp var(--duration-slow) var(--ease-out) both;
          animation-delay: calc(var(--stagger-delay) * 2);
        }

        /* ── CTAs ─────────────────────────────────────── */
        .hero-ctas {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);

          animation: fadeInUp var(--duration-slow) var(--ease-out) both;
          animation-delay: calc(var(--stagger-delay) * 3);
        }

        @media (min-width: 480px) {
          .hero-ctas {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
          }
        }

        /* ── CTA primary ──────────────────────────────── */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-3) var(--space-6);
          background-color: var(--color-accent);
          color: var(--color-on-accent);
          font-family: var(--font-sans);
          font-size: var(--text-body);
          font-weight: var(--font-weight-semibold);
          text-decoration: none;
          border-radius: var(--radius-btn);
          border: 1px solid transparent;
          transition:
            background-color var(--duration-fast) var(--ease-in-out),
            transform var(--duration-fast) var(--ease-out);
          cursor: pointer;
          white-space: nowrap;
        }

        .btn-primary:hover {
          background-color: var(--color-accent-hover);
        }

        .btn-primary:active {
          transform: scale(0.98);
        }

        /* ── CTA secondary ────────────────────────────── */
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-3) var(--space-6);
          background-color: rgba(255,255,255,0.03);
          color: var(--color-fg);
          font-family: var(--font-sans);
          font-size: var(--text-body);
          font-weight: var(--font-weight-medium);
          text-decoration: none;
          border-radius: var(--radius-btn);
          border: 1px solid var(--color-border);
          transition:
            color var(--duration-fast) var(--ease-in-out),
            background-color var(--duration-fast) var(--ease-in-out),
            border-color var(--duration-fast) var(--ease-in-out),
            transform var(--duration-fast) var(--ease-out);
          cursor: pointer;
          white-space: nowrap;
        }

        .btn-secondary:hover {
          color: var(--color-fg);
          background-color: rgba(255,255,255,0.06);
          border-color: var(--color-border-focus);
        }

        .btn-secondary:active {
          transform: scale(0.98);
        }

        /* ── Aside — decorative negative space ────────── */
        .hero-aside {
          display: none;
          position: relative;
          align-items: center;
          justify-content: flex-end;
        }

        @media (min-width: 768px) {
          .hero-aside {
            display: flex;
          }
        }

        .hero-deco-line {
          position: absolute;
          left: 50%;
          top: 20%;
          bottom: 20%;
          width: 1px;
          background-color: var(--color-border);
          transform: translateX(-50%);
        }

        .hero-deco-number {
          font-family: var(--font-mono);
          font-size: clamp(5rem, 8vw, 8rem);
          font-weight: var(--font-weight-bold);
          color: var(--color-fg-subtle);
          opacity: 0.18;
          letter-spacing: -0.05em;
          line-height: 1;
          user-select: none;
          pointer-events: none;
        }

        /* ── Fade-in-up keyframe ──────────────────────── */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
