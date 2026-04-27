'use client';

import { useTheme } from '@/hooks/use-theme';

const next: Record<string, 'light' | 'dark' | 'system'> = {
  light: 'dark',
  dark: 'system',
  system: 'light',
};

const labels: Record<string, string> = {
  light: 'Modo claro activo — click para modo oscuro',
  dark: 'Modo oscuro activo — click para modo sistema',
  system: 'Modo sistema activo — click para modo claro',
};

function SunIcon() {
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
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
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
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MonitorIcon() {
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
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

const icons: Record<string, React.ReactNode> = {
  light: <SunIcon />,
  dark: <MoonIcon />,
  system: <MonitorIcon />,
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(next[theme]);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={labels[theme]}
      title={labels[theme]}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2.25rem',
        height: '2.25rem',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid transparent',
        background: 'transparent',
        color: 'var(--color-fg-muted)',
        cursor: 'pointer',
        transition: 'color var(--duration-fast) var(--ease-in-out), border-color var(--duration-fast) var(--ease-in-out)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-fg)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-fg-muted)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'transparent';
      }}
    >
      <span
        key={theme}
        style={{
          display: 'inline-flex',
          animation: 'iconFadeIn 200ms ease-out both',
        }}
      >
        {icons[theme]}
      </span>
      <style>{`
        @keyframes iconFadeIn {
          from { opacity: 0; transform: scale(0.7) rotate(-15deg); }
          to   { opacity: 1; transform: scale(1)   rotate(0deg); }
        }
      `}</style>
    </button>
  );
}
