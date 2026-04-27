'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const NAV_LINKS = [
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '/contacto' },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const handleDrawerLinkClick = useCallback(
    (href: string) => {
      closeMobile();
      if (href.startsWith('#')) {
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    },
    [closeMobile]
  );

  return (
    <>
      {/* Skip to content — accessibility WCAG 2.4.1 */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only"
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 'calc(var(--z-modal) + 10)',
          padding: '0.5rem 1rem',
          background: 'var(--color-accent)',
          color: 'var(--color-surface)',
          borderRadius: 'var(--radius-sm)',
          fontWeight: 'var(--font-weight-semibold)',
          textDecoration: 'none',
          fontSize: 'var(--text-small)',
        }}
      >
        Saltar al contenido
      </a>

      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 'var(--z-sticky)',
          backgroundColor: scrolled
            ? 'color-mix(in srgb, var(--color-surface) 85%, transparent)'
            : 'var(--color-surface)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled
            ? '1px solid var(--color-border)'
            : '1px solid transparent',
          transition: `background-color var(--duration-base) var(--ease-in-out),
                       border-color var(--duration-base) var(--ease-in-out),
                       backdrop-filter var(--duration-base) var(--ease-in-out)`,
        }}
      >
        <div className="container">
          <nav
            aria-label="Navegación principal"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '3.5rem',
              gap: 'var(--space-4)',
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 'var(--font-weight-bold)',
                fontSize: '1.125rem',
                color: 'var(--color-fg)',
                textDecoration: 'none',
                letterSpacing: '-0.02em',
                flexShrink: 0,
              }}
              aria-label="tanitocode — inicio"
            >
              tanitocode
            </Link>

            {/* Desktop nav links */}
            <ul
              role="list"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
              className="nav-desktop-links"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="nav-link"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontSize: 'var(--text-small)',
                      color: 'var(--color-fg-muted)',
                      textDecoration: 'none',
                      padding: '0.375rem 0.625rem',
                      borderRadius: 'var(--radius-sm)',
                      position: 'relative',
                      display: 'inline-block',
                      transition: 'color var(--duration-fast) var(--ease-in-out)',
                    }}
                    onClick={
                      href.startsWith('#')
                        ? (e) => {
                            e.preventDefault();
                            const el = document.querySelector(href);
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }
                        : undefined
                    }
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Right side: theme toggle + hamburger */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                flexShrink: 0,
              }}
            >
              <ThemeToggle />

              {/* Hamburger — mobile only */}
              <button
                type="button"
                aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-drawer"
                onClick={() => setMobileOpen((v) => !v)}
                className="nav-hamburger"
                style={{
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  background: 'transparent',
                  color: 'var(--color-fg)',
                  cursor: 'pointer',
                  transition: 'border-color var(--duration-fast) var(--ease-in-out)',
                }}
              >
                {mobileOpen ? (
                  /* X icon */
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  /* Hamburger icon */
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 'var(--z-overlay)',
          display: mobileOpen ? 'flex' : 'none',
          flexDirection: 'column',
          backgroundColor: 'var(--color-bg)',
        }}
        className="nav-mobile-drawer"
      >
        {/* Drawer header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '3.5rem',
            padding: '0 var(--page-padding-x)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <Link
            href="/"
            onClick={closeMobile}
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 'var(--font-weight-bold)',
              fontSize: '1.125rem',
              color: 'var(--color-fg)',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
            }}
          >
            tanitocode
          </Link>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={closeMobile}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              background: 'transparent',
              color: 'var(--color-fg)',
              cursor: 'pointer',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <nav
          aria-label="Menú móvil"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'var(--space-8) var(--page-padding-x)',
            gap: 'var(--space-2)',
          }}
        >
          <ul
            role="list"
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => {
                    if (href.startsWith('#')) e.preventDefault();
                    handleDrawerLinkClick(href);
                  }}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--text-h3)',
                    color: 'var(--color-fg)',
                    textDecoration: 'none',
                    padding: 'var(--space-3) 0',
                    borderBottom: '1px solid var(--color-border)',
                    transition: 'color var(--duration-fast) var(--ease-in-out)',
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 'var(--space-6)' }}>
            <ThemeToggle />
          </div>
        </nav>
      </div>

      <style>{`
        /* Desktop: show nav links, hide hamburger */
        @media (min-width: 768px) {
          .nav-desktop-links {
            display: flex !important;
          }
          .nav-hamburger {
            display: none !important;
          }
          .nav-mobile-drawer {
            display: none !important;
          }
        }

        /* Mobile: hide desktop links, show hamburger */
        @media (max-width: 767px) {
          .nav-desktop-links {
            display: none !important;
          }
          .nav-hamburger {
            display: inline-flex !important;
          }
        }

        /* Animated underline on nav links (desktop) */
        @media (min-width: 768px) {
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: 2px;
            left: 0.625rem;
            right: 0.625rem;
            height: 1px;
            background-color: var(--color-accent);
            transform: scaleX(0);
            transform-origin: left center;
            transition: transform var(--duration-base) var(--ease-primary);
          }

          .nav-link:hover {
            color: var(--color-fg) !important;
          }

          .nav-link:hover::after {
            transform: scaleX(1);
          }

          .nav-link:focus-visible {
            color: var(--color-fg);
            outline: 2px solid var(--color-border-focus);
            outline-offset: 2px;
          }
        }
      `}</style>
    </>
  );
}
