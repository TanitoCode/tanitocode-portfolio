# CSS Foundation — tanitocode-portfolio

**Plataforma**: web (Next.js 16 + Tailwind v4)
**Generado por**: ux-architect
**Fecha**: 2026-04-23

**Design Intelligence**: categoria=Design System/Component Library | Estilo=Exaggerated Minimalism | Anti-patterns HIGH: Inter como heading font (ignorado por brief — Geist Sans obligatorio), teal SaaS (#14B8A6 / #2DD4BF / #5EEAD4), shadow uniforme en cards, colores hardcoded en componentes

---

## Regla de Oro

Todos los valores de color, tipografía, espaciado, radio y movimiento se aplican EXCLUSIVAMENTE vía custom properties CSS listadas en este archivo. Está prohibido hardcodear valores en componentes.

---

## 1. Color Tokens

### globals.css — bloque :root + dark mode

```css
/* ============================================================
   COLOR TOKENS — tanitocode-portfolio
   Paleta: monocromático + electric blue accent
   ============================================================ */

:root {
  /* Fondos */
  --color-bg:        #FAFAFA;
  --color-surface:   #FFFFFF;
  --color-surface-2: #F0F0F0;

  /* Texto */
  --color-fg:        #111111;
  --color-fg-muted:  #666666;
  --color-fg-subtle: #999999;

  /* Acento */
  --color-accent:       #1E40FF;
  --color-accent-hover: #1730CC;
  --color-accent-muted: rgba(30, 64, 255, 0.08);

  /* Borde */
  --color-border:       #E5E5E5;
  --color-border-focus: #1E40FF;

  /* Semánticos */
  --color-error:   #DC2626;
  --color-success: #16A34A;
  --color-code-bg: #F4F4F5;

  /* RGB companions para alpha compositing */
  --color-accent-rgb:  30, 64, 255;
  --color-fg-rgb:      17, 17, 17;
  --color-bg-rgb:      250, 250, 250;
}

/* ============================================================
   DARK MODE — via [data-theme="dark"]
   ============================================================ */

[data-theme="dark"] {
  color-scheme: dark;

  --color-bg:        #0A0A0A;
  --color-surface:   #111111;
  --color-surface-2: #1A1A1A;

  --color-fg:        #F5F5F5;
  --color-fg-muted:  #A0A0A0;
  --color-fg-subtle: #666666;

  --color-accent:       #2563EB;
  --color-accent-hover: #3B72F0;
  --color-accent-muted: rgba(37, 99, 235, 0.12);

  --color-border:       #1F1F1F;
  --color-border-focus: #2563EB;

  --color-error:   #F87171;
  --color-success: #4ADE80;
  --color-code-bg: #1A1A1A;

  --color-accent-rgb:  37, 99, 235;
  --color-fg-rgb:      245, 245, 245;
  --color-bg-rgb:      10, 10, 10;
}

/* ============================================================
   DARK MODE — via prefers-color-scheme (sin toggle manual)
   ============================================================ */

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;

    --color-bg:        #0A0A0A;
    --color-surface:   #111111;
    --color-surface-2: #1A1A1A;

    --color-fg:        #F5F5F5;
    --color-fg-muted:  #A0A0A0;
    --color-fg-subtle: #666666;

    --color-accent:       #2563EB;
    --color-accent-hover: #3B72F0;
    --color-accent-muted: rgba(37, 99, 235, 0.12);

    --color-border:       #1F1F1F;
    --color-border-focus: #2563EB;

    --color-error:   #F87171;
    --color-success: #4ADE80;
    --color-code-bg: #1A1A1A;

    --color-accent-rgb:  37, 99, 235;
    --color-fg-rgb:      245, 245, 245;
    --color-bg-rgb:      10, 10, 10;
  }
}
```

---

## 2. Typography Scale

Fuente heading: **Geist Sans** (Next/font/google o @vercel/font).
Fuente mono: **Geist Mono**.
NO Inter. NO otra fuente para headings.

```css
/* ============================================================
   TYPOGRAPHY TOKENS
   Escala tipográfica suiza — contraste alto entre niveles
   ============================================================ */

:root {
  /* Familias */
  --font-sans: 'Geist Sans', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, 'Cascadia Code', monospace;

  /* Display — hero / nombre / statement */
  --text-display: clamp(3.5rem, 6vw + 1rem, 5rem);     /* 56px mobile → 80px desktop */

  /* Headings */
  --text-h1: clamp(2.5rem, 4vw + 0.5rem, 3.5rem);      /* 40px → 56px */
  --text-h2: clamp(1.75rem, 2.5vw + 0.5rem, 2.25rem);  /* 28px → 36px */
  --text-h3: clamp(1.25rem, 1.5vw + 0.25rem, 1.5rem);  /* 20px → 24px */

  /* Body */
  --text-body-lg: clamp(1rem, 0.5vw + 0.875rem, 1.125rem); /* 16px → 18px */
  --text-body:    1rem;                                      /* 16px fixed */
  --text-small:   clamp(0.8125rem, 0.25vw + 0.75rem, 0.875rem); /* 13px → 14px */
  --text-xs:      0.75rem;                                   /* 12px */

  /* Mono */
  --text-mono: inherit; /* Hereda tamaño del contexto, cambia solo la familia */

  /* Pesos */
  --font-weight-normal:   400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;

  /* Letter spacing — swiss minimal: tight en headings, normal en body */
  --tracking-display: -0.04em;
  --tracking-heading: -0.025em;
  --tracking-normal:   0em;
  --tracking-wide:     0.04em;
  --tracking-wider:    0.08em;

  /* Line height */
  --leading-none:    1;
  --leading-tight:   1.2;
  --leading-snug:    1.35;
  --leading-normal:  1.5;
  --leading-relaxed: 1.65;
  --leading-code:    1.7;
}
```

---

## 3. Spacing Scale

Base 4px. Swiss minimal — secciones con espacio generoso.

```css
/* ============================================================
   SPACING TOKENS
   ============================================================ */

:root {
  --space-1:   0.25rem;  /*  4px */
  --space-2:   0.5rem;   /*  8px */
  --space-3:   0.75rem;  /* 12px */
  --space-4:   1rem;     /* 16px */
  --space-6:   1.5rem;   /* 24px */
  --space-8:   2rem;     /* 32px */
  --space-12:  3rem;     /* 48px */
  --space-16:  4rem;     /* 64px */
  --space-24:  6rem;     /* 96px */
  --space-32:  8rem;     /* 128px */

  /* Sección — espacio entre bloques principales */
  --space-section: clamp(4rem, 8vw, 8rem);  /* 64px → 128px */

  /* Padding de página lateral */
  --page-padding-x: clamp(1.25rem, 5vw, 3rem);
}
```

---

## 4. Border Radius

Cards: SOLO border visible — sin shadows. Radio contenido.

```css
/* ============================================================
   BORDER RADIUS TOKENS
   Swiss minimal: radios pequeños, nunca redondeado excesivo
   ============================================================ */

:root {
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-pill: 9999px;

  /* Alias semánticos */
  --radius-card:   var(--radius-md);
  --radius-btn:    var(--radius-sm);
  --radius-badge:  var(--radius-pill);
  --radius-input:  var(--radius-sm);
  --radius-tag:    var(--radius-sm);
}
```

---

## 5. Motion Tokens

Estilo: deliberate, no bouncy. Luxury-lean (swiss editorial).

```css
/* ============================================================
   MOTION TOKENS
   Curvas deliberadas — sin spring ni bounce
   ============================================================ */

:root {
  /* Duraciones */
  --duration-fast:   150ms;
  --duration-base:   250ms;
  --duration-slow:   400ms;
  --duration-reveal: 600ms;
  --stagger-delay:   80ms;

  /* Curvas */
  --ease-out:     cubic-bezier(0.2, 0.8, 0.2, 1);     /* Entradas de elementos */
  --ease-in:      cubic-bezier(0.4, 0, 1, 1);          /* Salidas */
  --ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1);        /* Transiciones bidireccionales */
  --ease-primary: cubic-bezier(0.16, 1, 0.3, 1);       /* Hover / reveal deliberado */

  /* Shortcuts de transición */
  --transition-color:      color var(--duration-fast) var(--ease-in-out),
                           background-color var(--duration-fast) var(--ease-in-out);
  --transition-border:     border-color var(--duration-fast) var(--ease-in-out);
  --transition-opacity:    opacity var(--duration-base) var(--ease-out);
  --transition-transform:  transform var(--duration-base) var(--ease-out);
  --transition-all:        all var(--duration-base) var(--ease-primary);
}

/* Respetar preferencia de movimiento reducido */
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast:   0ms;
    --duration-base:   0ms;
    --duration-slow:   0ms;
    --duration-reveal: 0ms;
    --stagger-delay:   0ms;
  }
}
```

---

## 6. Breakpoints

Mobile-first. Idénticos a los defaults de Tailwind v4.

```css
/* ============================================================
   BREAKPOINTS (referencia — uso via Tailwind o media queries)
   ============================================================

   sm:  640px   (≥640px)
   md:  768px   (≥768px)
   lg:  1024px  (≥1024px)
   xl:  1280px  (≥1280px)
   2xl: 1536px  (≥1536px)

   En custom media queries:
   @media (min-width: 640px)  { ... }
   @media (min-width: 768px)  { ... }
   @media (min-width: 1024px) { ... }
   @media (min-width: 1280px) { ... }
   @media (min-width: 1536px) { ... }
   ============================================================ */
```

---

## 7. Grid System

Layout asimétrico intencional — no centered-card-everywhere.

```css
/* ============================================================
   GRID & CONTAINER TOKENS
   12 cols desktop / 4 cols mobile — gap 24px
   Max-width 1200px — asimétrico por diseño
   ============================================================ */

:root {
  --container-max:  1200px;
  --container-sm:   640px;
  --container-md:   768px;
  --grid-cols:      12;
  --grid-cols-mob:  4;
  --grid-gap:       1.5rem;   /* 24px */
  --grid-gap-sm:    1rem;     /* 16px */
}

/* Container base */
.container {
  width: 100%;
  max-width: var(--container-max);
  padding-inline: var(--page-padding-x);
  margin-inline: auto;
}

/* Grid base — 4 cols mobile, 12 cols desktop */
.grid-base {
  display: grid;
  grid-template-columns: repeat(var(--grid-cols-mob), 1fr);
  gap: var(--grid-gap);
}

@media (min-width: 1024px) {
  .grid-base {
    grid-template-columns: repeat(var(--grid-cols), 1fr);
  }
}

/*
  Layouts asimétricos predefinidos (usar en componentes):

  - 7/5 split:  grid-cols: 7fr 5fr   (texto izq + aside der)
  - 5/7 split:  grid-cols: 5fr 7fr   (aside izq + contenido der)
  - 8/4 split:  grid-cols: 8fr 4fr   (hero ancho + info estrecha)
  - 3/9 split:  grid-cols: 3fr 9fr   (sidebar nav + contenido)

  NO usar layout centrado-en-card para todo — variar por sección.
*/
```

---

## 8. Z-Index Scale

```css
/* ============================================================
   Z-INDEX — escala centralizada
   NUNCA usar z-index numérico directo en componentes
   ============================================================ */

:root {
  --z-base:    0;
  --z-raised:  1;
  --z-dropdown: 10;
  --z-sticky:  20;
  --z-overlay: 30;
  --z-modal:   40;
  --z-toast:   50;
}
```

---

## 9. Dark Mode — Implementación Completa

### Script anti-FOUC — colocar en `<head>` ANTES de cualquier stylesheet

```html
<!-- Anti-FOUC: detecta tema antes de que el browser pinte -->
<script>
  (function () {
    try {
      var stored = localStorage.getItem('theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = stored || (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
</script>
```

### En Next.js 16 — colocar en `app/layout.tsx`

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',s||(d?'dark':'light'));}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Nota**: `suppressHydrationWarning` en `<html>` es obligatorio — evita el warning de React cuando el script muta el atributo `data-theme` antes de la hidratación.

### Hook de toggle — `useTheme.ts`

```typescript
// hooks/useTheme.ts
'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    setTheme(stored ?? 'system');
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === 'system') {
      root.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    } else {
      root.setAttribute('data-theme', t);
      localStorage.setItem('theme', t);
    }
    setTheme(t);
  };

  return { theme, setTheme: applyTheme };
}
```

---

## 10. Tailwind v4 — Integración

En Tailwind v4 la configuración principal usa CSS-first con `@theme`. El archivo `tailwind.config.ts` sigue siendo compatible para `extend`.

### Opción A — CSS-first (recomendada para Tailwind v4)

```css
/* globals.css — DESPUÉS del bloque :root de custom properties */

@import "tailwindcss";

@theme {
  /* Colores — mapeados desde custom properties */
  --color-bg:              var(--color-bg);
  --color-surface:         var(--color-surface);
  --color-surface-2:       var(--color-surface-2);
  --color-fg:              var(--color-fg);
  --color-fg-muted:        var(--color-fg-muted);
  --color-fg-subtle:       var(--color-fg-subtle);
  --color-accent:          var(--color-accent);
  --color-accent-hover:    var(--color-accent-hover);
  --color-accent-muted:    var(--color-accent-muted);
  --color-border:          var(--color-border);
  --color-border-focus:    var(--color-border-focus);
  --color-error:           var(--color-error);
  --color-success:         var(--color-success);
  --color-code-bg:         var(--color-code-bg);

  /* Tipografía */
  --font-sans: 'Geist Sans', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, 'Cascadia Code', monospace;

  /* Escala tipográfica */
  --text-display: var(--text-display);
  --text-h1:      var(--text-h1);
  --text-h2:      var(--text-h2);
  --text-h3:      var(--text-h3);
  --text-body-lg: var(--text-body-lg);
  --text-small:   var(--text-small);

  /* Espaciado extra */
  --spacing-section: var(--space-section);

  /* Border radius */
  --radius-sm:   var(--radius-sm);
  --radius-md:   var(--radius-md);
  --radius-lg:   var(--radius-lg);
  --radius-pill: var(--radius-pill);

  /* Motion */
  --ease-primary:  var(--ease-primary);
  --ease-out:      var(--ease-out);
  --duration-fast: var(--duration-fast);
  --duration-base: var(--duration-base);
  --duration-slow: var(--duration-slow);
}
```

### Opción B — tailwind.config.ts (compatibilidad)

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg:           'var(--color-bg)',
        surface:      'var(--color-surface)',
        'surface-2':  'var(--color-surface-2)',
        fg:           'var(--color-fg)',
        'fg-muted':   'var(--color-fg-muted)',
        'fg-subtle':  'var(--color-fg-subtle)',
        accent:       'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'accent-muted': 'var(--color-accent-muted)',
        border:       'var(--color-border)',
        'border-focus': 'var(--color-border-focus)',
        error:        'var(--color-error)',
        success:      'var(--color-success)',
        'code-bg':    'var(--color-code-bg)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        'display': 'var(--text-display)',
        'h1':      'var(--text-h1)',
        'h2':      'var(--text-h2)',
        'h3':      'var(--text-h3)',
        'body-lg': 'var(--text-body-lg)',
        'small':   'var(--text-small)',
      },
      spacing: {
        'section': 'var(--space-section)',
        'page-x':  'var(--page-padding-x)',
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        pill: 'var(--radius-pill)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        primary:  'var(--ease-primary)',
        'ease-out': 'var(--ease-out)',
      },
      maxWidth: {
        container: 'var(--container-max)',
      },
      zIndex: {
        dropdown: 'var(--z-dropdown)',
        sticky:   'var(--z-sticky)',
        overlay:  'var(--z-overlay)',
        modal:    'var(--z-modal)',
        toast:    'var(--z-toast)',
      },
    },
  },
  plugins: [],
};

export default config;
```

**Nota dark mode en Tailwind v4**: usar `darkMode: ['selector', '[data-theme="dark"]']` — hace que las clases `dark:` respondan al atributo en lugar de a `prefers-color-scheme` directamente. El CSS custom ya maneja `prefers-color-scheme` via media query fallback.

---

## Anti-patterns — Gates QA (grep)

Los siguientes patrones deben retornar 0 resultados en cualquier archivo de componentes:

```bash
# Colores teal prohibidos
grep -r "#14B8A6\|#2DD4BF\|#5EEAD4\|teal" --include="*.tsx" --include="*.ts" --include="*.css" src/

# Shadow uniforme en cards (señal de copy-paste genérico)
grep -r "shadow-sm\|shadow-md\|shadow-lg" --include="*.tsx" src/components/

# Inter como heading font (anti-pattern explícito del brief)
grep -r "font-family.*Inter\|fontFamily.*Inter" --include="*.css" --include="*.ts" src/

# Colores hardcoded en componentes (cualquier hex directo)
grep -rP "(?<!--color-)#[0-9A-Fa-f]{3,6}" --include="*.tsx" src/components/
```

---

## Notas de Implementación para Dev Agents

1. **Carga de fuentes (Next.js)**: usar `next/font/local` con los archivos de Geist descargados vía `@vercel/font`, o `next/font/google` si disponible. Exponer como CSS variables `--font-sans` y `--font-mono` en el `<html>`.

2. **globals.css**: importar en orden: (1) `@import "tailwindcss"`, (2) bloque `:root` con todos los tokens, (3) bloque `[data-theme="dark"]`, (4) media query `prefers-color-scheme`, (5) bloque `@theme` de Tailwind v4 si se usa CSS-first.

3. **Cards**: usar `border: 1px solid var(--color-border)` + `background: var(--color-surface)`. Cero box-shadow en estado estático. Hover permitido: `border-color: var(--color-border-focus)` con `transition: var(--transition-border)`.

4. **Layout asimétrico**: el orquestador ha documentado que el layout NO es centered-card-everywhere. Cada sección debe usar una proporción distinta del grid de 12 columnas. Ver sección 7 para los splits predefinidos.

5. **Script anti-FOUC**: OBLIGATORIO en `app/layout.tsx` antes de cualquier otro script o link stylesheet. Sin él habrá flash blanco en usuarios dark-mode.
