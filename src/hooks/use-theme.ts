'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    setThemeState(stored ?? 'system');
  }, []);

  const setTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === 'system') {
      root.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    } else {
      root.setAttribute('data-theme', t);
      localStorage.setItem('theme', t);
    }
    setThemeState(t);
  };

  return { theme, setTheme };
}
