'use client';

import Link from 'next/link';

function GitHubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/TanitoCode',
    icon: <GitHubIcon />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mario-cristian-sanchez/',
    icon: <LinkedInIcon />,
  },
  {
    label: 'Email',
    href: 'mailto:mariocrsanchez@gmail.com',
    icon: <EnvelopeIcon />,
  },
] as const;

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div className="container">
        {/* Main footer grid — asymmetric: logo col wider than social col */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 'var(--space-8)',
            alignItems: 'start',
            paddingTop: 'var(--space-12)',
            paddingBottom: 'var(--space-8)',
          }}
          className="footer-main-grid"
        >
          {/* Left: logo + tagline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
            }}
          >
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 'var(--font-weight-bold)',
                fontSize: '1.125rem',
                color: 'var(--color-fg)',
                textDecoration: 'none',
                letterSpacing: '-0.02em',
                display: 'inline-block',
              }}
              aria-label="tanitocode — inicio"
            >
              tanitocode
            </Link>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-small)',
                color: 'var(--color-fg-muted)',
                lineHeight: 'var(--leading-normal)',
              }}
            >
              Desarrollador Fullstack
            </p>
          </div>

          {/* Right: social links */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              alignItems: 'flex-end',
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-fg-subtle)',
                letterSpacing: 'var(--tracking-wide)',
                textTransform: 'uppercase',
              }}
            >
              Contacto
            </p>
            <ul
              role="list"
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                gap: 'var(--space-3)',
                alignItems: 'center',
              }}
            >
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    aria-label={label}
                    title={label}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="footer-social-link"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '2.25rem',
                      height: '2.25rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-fg-muted)',
                      textDecoration: 'none',
                      transition: `color var(--duration-fast) var(--ease-in-out),
                                   border-color var(--duration-fast) var(--ease-in-out)`,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = 'var(--color-accent)';
                      el.style.borderColor = 'var(--color-accent)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.color = 'var(--color-fg-muted)';
                      el.style.borderColor = 'var(--color-border)';
                    }}
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar: copyright — left-aligned, not centered */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: 'var(--space-4)',
            paddingBottom: 'var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            flexWrap: 'wrap',
          }}
          className="footer-bottom-bar"
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-fg-subtle)',
            }}
          >
            &copy; 2026 TanitoCode
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-fg-subtle)',
            }}
          >
            Construido con Next.js + Tailwind
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .footer-main-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-6) !important;
          }
          .footer-main-grid > div:last-child {
            align-items: flex-start !important;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: var(--space-2) !important;
          }
        }
      `}</style>
    </footer>
  );
}
