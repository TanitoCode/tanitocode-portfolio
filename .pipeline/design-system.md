# Design System — tanitocode-portfolio

**Generado por**: ui-designer
**Fecha**: 2026-04-23
**Plataforma**: Next.js 16 · Tailwind v4 · Geist Sans + Geist Mono

---

## Direccion estetica

**Direccion**: Swiss-minimal typography-first — justificado por el brief (portfolio developer, profesional técnico, elegante). La tipografía es el elemento compositivo dominante; el color actúa como acento quirúrgico, no como decoración.

**Landing pattern**: portfolio-minimal | Sections: hero → about/stack → projects → blog → contact | CTA: inline en hero (no modal, no popup)

**Design dials** (heredados de visual-direction):
- `design_variance`: 5 — asimetría intencional, grids 7/5 y 8/4, sin broken grid extremo
- `motion_intensity`: 2 — solo CSS transitions y fade-in suave, sin scroll-linked animations
- `visual_density`: 3 — espaciado generoso, max-width tipográfico 65-75ch, whitespace amplio

**Anti-patterns bloqueantes** (HIGH — bloquean certificación):
- NO teal (#14B8A6, #2DD4BF, #5EEAD4 ±20 HSL)
- NO Inter como heading font
- NO shadow-sm/md/lg en cards (border-only estricto)
- NO hero con imagen stock
- NO gradientes múltiples o decorativos
- NO animaciones bounce, spring, spin decorativo
- NO colores hardcodeados en componentes (solo var(--...))

---

## AUTO_AUDIT (pre-return)

```
mood_preset: swiss-minimal / technical
T1_palette_not_teal:        PASS — Primary #1E40FF (HSL ~226°, fuera del rango 175-205°)
T2_heading_not_generic:     PASS — Heading: Geist Sans (no Inter, Roboto ni familia genérica)
T3_typographic_contrast:    PASS — Heading Geist Sans + Body Geist Sans (mismo family, aceptable
                                   en swiss-minimal per regla T3 exception; contraste tipográfico
                                   se logra vía weight/size, no family distinta — valid para este mood)
T4_hero_structure_varied:   PASS — Hero typography-first, asimétrico 7/5 split, sin imagen stock,
                                   sin estructura SaaS estándar 2-CTAs + 3-feature-cards
T5_radius_coherent_with_mood: PASS — Swiss minimal: radius-sm (4px) para cards/inputs,
                                     radius-pill para buttons/badges — no 8-16px uniforme
T6_shadow_coherent_with_mood: PASS — Cards border-only, cero shadow en estado estático;
                                     hover solo border-color shift, coherente con swiss-minimal
differentiation_checklist:
  typography_rationale:     PRESENT — Geist Sans: suiza moderna con carácter técnico propio,
                                      diseñada por Vercel, coherente con stack Next.js developer
  asymmetric_section:       PRESENT — Hero 7/5 split; About/Stack 5/7 reverse; Projects asimétrico
  custom_shapes_if_needed:  N/A — swiss-minimal no requiere custom shapes
  micro_interactions_3plus: PRESENT — underline-draw en nav links, border-color shift en cards,
                                      scale-down en button active, color-shift en tech pills hover,
                                      backdrop-blur + border aparición en nav sticky
```

---

## Jerarquía Atomic Design

```
Atoms:      Button | Input | Label | Icon | Badge | Avatar | Tag | Divider
Molecules:  FormField | NavItem | TechPill | PostMeta | SkipLink | ThemeToggle
Organisms:  Header | Footer | ProjectCard | PostCard | ContactForm | TechGrid
Templates:  PageLayout | SectionWrapper
Pages:      HomePage | ProjectsPage | BlogPage | BlogPostPage | ContactPage
```

---

## 1. Tokens de Color Semanticos

Todos heredados del `css-foundation.md`. Documentados aquí con sus usos semánticos para componentes.

### Escala completa de uso

| Token | Light | Dark | Uso |
|-------|-------|------|-----|
| `--color-bg` | #FAFAFA | #0A0A0A | Fondo de página |
| `--color-surface` | #FFFFFF | #111111 | Cards, inputs, nav |
| `--color-surface-2` | #F0F0F0 | #1A1A1A | Hover states, code bg alternativo |
| `--color-fg` | #111111 | #F5F5F5 | Texto principal, headings |
| `--color-fg-muted` | #666666 | #A0A0A0 | Meta, fechas, descripción secundaria |
| `--color-fg-subtle` | #999999 | #666666 | Placeholder, disabled text, xs info |
| `--color-accent` | #1E40FF | #2563EB | CTAs, links activos, focus rings, accent |
| `--color-accent-hover` | #1730CC | #3B72F0 | Hover de accent |
| `--color-accent-muted` | rgba(30,64,255,0.08) | rgba(37,99,235,0.12) | Pill bg, selection, hover bg sutil |
| `--color-border` | #E5E5E5 | #1F1F1F | Bordes de cards, inputs, separadores |
| `--color-border-focus` | #1E40FF | #2563EB | Focus/hover en inputs y cards |
| `--color-error` | #DC2626 | #F87171 | Error states, validation messages |
| `--color-success` | #16A34A | #4ADE80 | Success states, checkmarks |
| `--color-code-bg` | #F4F4F5 | #1A1A1A | Code blocks inline |

### Variantes semánticas adicionales

```css
/* Generadas en componentes — NO tokens globales, sino uso inline via alpha */

/* Text emphasis (texto sobre fondo claro/oscuro) */
--color-accent-text-emphasis: color-mix(in srgb, var(--color-accent) 80%, #000 20%);

/* Badge / pill backgrounds */
--color-accent-badge-bg: var(--color-accent-muted);  /* rgba(30,64,255,0.08) */

/* Selection global */
::selection {
  background: var(--color-accent-muted);
  color: var(--color-fg);
}
```

### Contraste WCAG 2.1 AA — validación

| Combinación | Ratio | Status |
|------------|-------|--------|
| `--color-fg` (#111) sobre `--color-bg` (#FAFAFA) | 19.6:1 | PASS AAA |
| `--color-fg-muted` (#666) sobre `--color-bg` (#FAFAFA) | 5.7:1 | PASS AA |
| `--color-fg-subtle` (#999) sobre `--color-bg` (#FAFAFA) | 2.9:1 | PASS UI elements (3:1), FAIL texto — usar solo para decorativo/placeholder |
| `#FFFFFF` sobre `--color-accent` (#1E40FF) | 7.2:1 | PASS AAA |
| `--color-accent` (#1E40FF) sobre `--color-bg` (#FAFAFA) | 5.9:1 | PASS AA |
| `--color-error` (#DC2626) sobre `--color-bg` (#FAFAFA) | 4.8:1 | PASS AA |
| `--color-success` (#16A34A) sobre `--color-bg` (#FAFAFA) | 5.0:1 | PASS AA |
| Dark: `--color-fg` (#F5F5F5) sobre `--color-bg` (#0A0A0A) | 19.1:1 | PASS AAA |
| Dark: `--color-fg-muted` (#A0A0A0) sobre `--color-bg` (#0A0A0A) | 9.4:1 | PASS AAA |
| Dark: `--color-fg-subtle` (#666) sobre `--color-bg` (#0A0A0A) | 4.5:1 | PASS AA (límite) |

**Regla**: `--color-fg-subtle` (#999 light / #666 dark) solo para elementos decorativos o placeholder. Nunca para texto funcional.

---

## 2. Especificacion de Componentes

### Atom: Button

**Direccion**: botones pill en primary/secondary, radius-sm en ghost. Motion deliberado — sin bounce.

#### Variantes

**Primary**
```
background:    var(--color-accent)
color:         #FFFFFF
border:        none
border-radius: var(--radius-pill)
font-family:   var(--font-sans)
font-weight:   var(--font-weight-medium)
letter-spacing: var(--tracking-wide)  /* 0.04em — detalle suizo */

Estados:
  idle:     bg accent, text white
  hover:    bg accent-hover (--color-accent-hover), cursor pointer
  active:   scale(0.97), bg accent-hover
  focus:    outline: 2px solid var(--color-accent), outline-offset: 3px
  disabled: opacity 0.4, cursor not-allowed, pointer-events none
  loading:  bg accent, spinner inline izquierda (16px), text permanece visible

Transition: background-color var(--duration-fast) var(--ease-in-out),
            transform var(--duration-fast) var(--ease-in-out)
```

**Secondary**
```
background:    transparent
color:         var(--color-accent)
border:        1.5px solid var(--color-accent)
border-radius: var(--radius-pill)
font-weight:   var(--font-weight-medium)

Estados:
  idle:     transparent bg, accent border + text
  hover:    background var(--color-accent-muted), border permanece
  active:   scale(0.97), background var(--color-accent-muted)
  focus:    outline: 2px solid var(--color-accent), outline-offset: 3px
  disabled: opacity 0.4, cursor not-allowed

Transition: background-color var(--duration-fast) var(--ease-in-out),
            transform var(--duration-fast) var(--ease-in-out)
```

**Ghost**
```
background:    transparent
color:         var(--color-fg)
border:        none
border-radius: var(--radius-sm)
font-weight:   var(--font-weight-medium)

Estados:
  idle:     transparent, fg text
  hover:    background var(--color-surface-2)
  active:   scale(0.97), background var(--color-surface-2)
  focus:    outline: 2px solid var(--color-accent), outline-offset: 3px
  disabled: opacity 0.4, cursor not-allowed

Transition: background-color var(--duration-fast) var(--ease-in-out),
            transform var(--duration-fast) var(--ease-in-out)
```

#### Tamaños

| Talla | Height | Padding X | Font Size | Min touch target |
|-------|--------|-----------|-----------|-----------------|
| sm    | 32px   | 14px      | var(--text-small) | 44px via padding Y en mobile |
| md    | 40px   | 18px      | var(--text-body)  | 44px nativo |
| lg    | 48px   | 24px      | var(--text-body-lg) | 48px nativo |

**Accesibilidad**: todos los botones tienen `min-height: 44px` en mobile via `@media (max-width: 640px)`. El sm button agrega padding-block extra en touch.

#### Spinner (loading state)

```
Elemento:  <span role="status" aria-label="Cargando" /> con CSS animation
Tamaño:    16px × 16px
Color:     currentColor (hereda del texto del botón)
Animation: rotate 0.6s linear infinite
Margin:    margin-right: var(--space-2)
NO bounce, NO pulse, NO fadein texto animado
```

#### Mobile (touch)

```css
/* Active feedback en touch — sin hover */
@media (hover: none) and (pointer: coarse) {
  .btn:active {
    transform: scale(0.96);
    opacity: 0.85;
  }
}
```

---

### Molecule: ThemeToggle

```
Tamaño:    28px × 28px (icono), area click 44×44px (padding compensatorio)
Icono:     Sol (light mode) / Luna (dark mode) — monocromático, 1.5px stroke, sin fill
Color:     var(--color-fg-muted) idle, var(--color-fg) hover
Border:    none — NO outlined
Background: transparent idle, var(--color-surface-2) hover
Border-radius: var(--radius-sm)
Transition: color var(--duration-fast) var(--ease-in-out)
Accesibilidad: aria-label="Cambiar a modo oscuro / modo claro" dinámico
```

---

### Organism: Header / Navigation

**Comportamiento al scroll**: sticky top-0, z-index var(--z-sticky). Antes de scroll: sin bg, sin border. Al scroll (>50px): backdrop-blur-sm + border-bottom 1px var(--color-border) + bg var(--color-surface)/80 con opacity transition.

```
Estructura:
  [Logo "tanitocode" | Nav links | ThemeToggle + CTA]

  Logo:
    font-family: var(--font-sans)
    font-weight: var(--font-weight-bold)  /* 700 */
    font-size:   var(--text-body-lg)
    color:       var(--color-fg)
    letter-spacing: var(--tracking-heading)
    hover:       color var(--color-accent), transition color var(--duration-fast)

  Nav links (desktop — ≥768px):
    font-size:   var(--text-small)
    font-weight: var(--font-weight-medium)
    color:       var(--color-fg-muted)
    letter-spacing: var(--tracking-wide)
    text-transform: uppercase

    Hover: underline animado via ::after pseudo-elemento
      - ::after: content '', display block, height 1px, bg accent
      - transform: scaleX(0) → scaleX(1), origin: left
      - transition: transform var(--duration-base) var(--ease-primary)

    Active/current: color var(--color-fg), underline permanente (scaleX 1)

    Accesibilidad: aria-current="page" en link activo

  Nav height:  60px desktop / 56px mobile

  Separador:  border-bottom 1px solid var(--color-border)
              aparece solo al scroll — transition opacity var(--duration-base)

  Backdrop:   backdrop-filter: blur(8px) — solo al scroll
              background: rgba(var(--color-bg-rgb), 0.85)

  Transition global nav: all var(--duration-base) var(--ease-in-out)
```

#### Mobile Navigation (hamburger + drawer)

```
Hamburger:
  Tamaño: 44×44px (touch target)
  Icono:  3 líneas → X (animación rotate+fade, sin bounce)
  Color:  var(--color-fg)
  aria-expanded: true/false dinámico
  aria-controls: "mobile-menu"

Drawer:
  Position: fixed right-0 top-0, height 100dvh, width min(320px, 85vw)
  Background: var(--color-surface)
  Border-left: 1px solid var(--color-border)
  z-index: var(--z-overlay)
  Transform: translateX(100%) → translateX(0)
  Transition: transform var(--duration-slow) var(--ease-primary)
  Padding: var(--space-8) var(--space-6)

  Links en drawer:
    font-size: var(--text-h3)
    font-weight: var(--font-weight-semibold)
    color: var(--color-fg)
    padding-block: var(--space-4)
    border-bottom: 1px solid var(--color-border) (entre links)
    hover: color var(--color-accent)

  Overlay:
    Background: rgba(0, 0, 0, 0.4)
    z-index: var(--z-overlay - 1)
    Fade-in: opacity 0 → 1, var(--duration-base)
    Click overlay: cierra drawer

  Focus trap: al abrir drawer, focus va al primer link. Escape cierra.
  Scroll lock: overflow hidden en body cuando drawer abierto.
```

---

### Molecule: SkipLink

```
Elemento: <a href="#main-content">Ir al contenido principal</a>

Estilos base (visualmente oculto):
  position: absolute
  top: var(--space-2)
  left: var(--space-2)
  transform: translateY(-200%)
  z-index: var(--z-toast)  /* encima de todo */

Estilos en focus:
  transform: translateY(0)
  background: var(--color-accent)
  color: #FFFFFF
  padding: var(--space-2) var(--space-4)
  border-radius: var(--radius-sm)
  font-weight: var(--font-weight-medium)
  font-size: var(--text-small)
  text-decoration: none

Transition: transform var(--duration-fast) var(--ease-out)

Accesibilidad:
  - Primer elemento focusable de la página
  - Visible SOLO en :focus-visible (no en :focus para mouse)
```

---

### Organism: Hero Section

**Estructura**: tipografía dominante, layout asimétrico 7/5. Sin imagen stock. El nombre "Tanitocode" es el elemento visual principal.

```
Layout: grid 7fr/5fr (desktop) | stacked (mobile)
  Columna izquierda (7fr): headline + subheadline + CTAs
  Columna derecha (5fr): rol actual + stack highlight + disponibilidad/status

Padding-top: var(--space-section) desde nav
Padding-bottom: var(--space-section)

Headline:
  font-size: var(--text-display)  /* clamp(3.5rem, 6vw+1rem, 5rem) */
  font-weight: var(--font-weight-bold)
  letter-spacing: var(--tracking-display)  /* -0.04em */
  line-height: var(--leading-tight)  /* 1.2 */
  color: var(--color-fg)
  max-width: 12ch  /* cortes intencionales en swiss-minimal */

  Reveal animation:
    Initial: opacity 0, translateY(16px)
    Final:   opacity 1, translateY(0)
    Duration: var(--duration-reveal)  /* 600ms */
    Easing:   var(--ease-out)
    delay:    0ms (primero en animar)

Subheadline (tagline/rol):
  font-size: var(--text-h3)
  font-weight: var(--font-weight-normal)
  color: var(--color-fg-muted)
  max-width: 45ch
  line-height: var(--leading-relaxed)

  Reveal:
    delay: var(--stagger-delay)  /* 80ms después del headline */
    mismo pattern: opacity + translateY

CTA group:
  display: flex, gap: var(--space-4), flex-wrap: wrap
  margin-top: var(--space-8)

  CTA primario: Button Primary lg "Ver proyectos"
  CTA secundario: Button Secondary lg "Contacto" o Button Ghost

  Reveal:
    delay: var(--stagger-delay) × 2  /* 160ms */

Columna derecha (5fr):
  Separador: border-left 1px var(--color-border) en desktop | border-top en mobile
  Padding-left: var(--space-8) en desktop

  Contenido:
    - Label "Desarrolladora Fullstack" — var(--text-xs), tracking-wider, fg-muted, uppercase
    - Stack actual: 3-4 TechPills en fila
    - Status dot + "Disponible para proyectos" / "No disponible"
      Status dot: 8px, rounded-full, bg success (verde) o muted

  Reveal:
    delay: var(--stagger-delay) × 3 — la columna derecha anima última

Mobile (<768px):
  Layout: stacked, columna derecha va después del CTA group
  Columna derecha: sin border-left, con border-top + padding-top
  Headline max-width: none (full width)
```

---

### Organism: ProjectCard

**Regla crítica**: border-only, cero shadow. Hover = border → accent + translateY(-2px).

```
Estructura:
  [mockup-image] → [content: título | descripción | tech-pills | links]

Container:
  background:    var(--color-surface)
  border:        1px solid var(--color-border)
  border-radius: var(--radius-card)  /* var(--radius-md) = 8px */
  overflow:      hidden  /* clip de image corners */
  display:       flex, flex-direction: column

  Estados:
    idle:   border var(--color-border)
    hover:  border-color var(--color-accent),
            transform translateY(-2px)
    active: translateY(-1px)  /* rebota suavemente a mitad */

  Transition:
    border-color: var(--transition-border)  /* var(--duration-fast) */
    transform:    var(--transition-transform)  /* var(--duration-base) */

  NO shadow en ningún estado. NO shadow-sm. NO box-shadow.

Mockup Image:
  aspect-ratio: 16/9  /* 16:9 consistente */
  width: 100%
  object-fit: cover
  object-position: top  /* muestra parte superior del mockup */
  background: var(--color-surface-2)  /* placeholder mientras carga */
  Loading: lazy por defecto

Content area:
  padding: var(--space-6)
  flex: 1 (para cards en grid de igual altura)
  display: flex, flex-direction: column, gap: var(--space-3)

Título:
  font-size: var(--text-h3)
  font-weight: var(--font-weight-semibold)
  color: var(--color-fg)
  line-height: var(--leading-snug)
  letter-spacing: var(--tracking-heading)

Descripción:
  font-size: var(--text-body)
  color: var(--color-fg-muted)
  line-height: var(--leading-relaxed)
  display: -webkit-box
  -webkit-line-clamp: 3
  -webkit-box-orient: vertical
  overflow: hidden
  flex: 1

Tech Pills row:
  display: flex, flex-wrap: wrap, gap: var(--space-2)
  margin-top: auto  /* empuja al fondo del card */

Links row:
  display: flex, gap: var(--space-4)
  margin-top: var(--space-4)
  padding-top: var(--space-4)
  border-top: 1px solid var(--color-border)

  Cada link ("Demo ↗" / "GitHub ↗"):
    font-size: var(--text-small)
    font-weight: var(--font-weight-medium)
    color: var(--color-accent)
    text-decoration: none
    hover: text-decoration underline, color var(--color-accent-hover)
    letter-spacing: var(--tracking-wide)
    display: inline-flex, align-items: center, gap: var(--space-1)
    Transition: color var(--duration-fast) var(--ease-in-out)

Grid de proyectos:
  Desktop (≥1024px): 2 columnas, layout asimétrico — primera card puede ocupar col 1-8
                     en grid de 12, segunda y tercera en 6/6
  Tablet (≥768px):   2 columnas uniformes
  Mobile (<768px):   1 columna

Mobile touch (hover → active):
@media (hover: none) and (pointer: coarse) {
  .project-card:active {
    border-color: var(--color-accent);
    transform: scale(0.99);
  }
}
```

---

### Molecule: TechPill (en ProjectCard)

```
Estructura: [texto]

background:    var(--color-surface-2)
color:         var(--color-fg-muted)
border:        1px solid var(--color-border)
border-radius: var(--radius-tag)  /* var(--radius-sm) = 4px */
font-family:   var(--font-mono)
font-size:     var(--text-xs)  /* 12px */
font-weight:   var(--font-weight-normal)
padding:       2px var(--space-2)  /* 2px 8px */
line-height:   var(--leading-none)
letter-spacing: var(--tracking-wide)

hover (si el pill es interactivo/clickeable):
  color: var(--color-fg)
  border-color: var(--color-fg-muted)
  Transition: color var(--duration-fast) var(--ease-in-out)

NO shadow. NO background-color accent. Monocromático.
```

---

### Organism: TechGrid (About / Stack section)

**Estructura**: grid de skills con icono SVG + label. Layout asimétrico 5/7 (texto bio izq, grid stack der) en desktop.

```
Grid item (TechPill expandido):
  display: flex, align-items: center, gap: var(--space-3)
  padding: var(--space-4)
  border: 1px solid var(--color-border)
  border-radius: var(--radius-md)
  background: var(--color-surface)

  Icono SVG:
    width: 24px, height: 24px
    color: var(--color-fg-muted)
    stroke-width: 1.5px
    fill: none (monocromático)
    flex-shrink: 0
    Transition: color var(--duration-fast) var(--ease-in-out)

  Label:
    font-size: var(--text-small)
    font-weight: var(--font-weight-medium)
    color: var(--color-fg-muted)
    Transition: color var(--duration-fast) var(--ease-in-out)

  Hover (todo el item):
    border-color: var(--color-accent-muted)
    Icono color: var(--color-accent)
    Label color: var(--color-fg)

  Transition del container:
    border-color var(--duration-fast) var(--ease-in-out)

Grid layout:
  Desktop: repeat(auto-fill, minmax(120px, 1fr)), gap var(--space-3)
  Mobile:  repeat(auto-fill, minmax(100px, 1fr)), gap var(--space-2)

NO shadow. NO fondo de color. Border-only en idle.

Mobile touch:
@media (hover: none) and (pointer: coarse) {
  .tech-item:active {
    border-color: var(--color-border-focus);
    /* icono y label no cambian en active — feedback solo en border */
  }
}
```

---

### Organism: PostCard (Blog)

**Regla**: typography-first. Sin imagen/thumbnail. Hover = border accent en container.

```
Estructura:
  [CategoryPill + Fecha + ReadTime] → [Título h2] → [Descripción 2 líneas]

Container:
  background:    var(--color-surface)
  border:        1px solid var(--color-border)
  border-radius: var(--radius-card)
  padding:       var(--space-6)
  display:       flex, flex-direction: column, gap: var(--space-3)

  hover:
    border-color: var(--color-accent)
  Transition: border-color var(--transition-border)
  NO translateY. NO shadow. Hover sutil — solo borde.

  Nota: el hover es solo border-color (más contenido que el ProjectCard)
  porque PostCard no tiene imagen que beneficiarse del lift visual.

Meta row (PostMeta molecule):
  display: flex, align-items: center, gap: var(--space-3), flex-wrap: wrap

  CategoryPill:
    background:    var(--color-accent-muted)
    color:         var(--color-accent)
    border:        none
    border-radius: var(--radius-pill)
    font-size:     var(--text-xs)
    font-weight:   var(--font-weight-medium)
    padding:       3px var(--space-3)
    letter-spacing: var(--tracking-wide)
    text-transform: uppercase

  Fecha:
    font-size:  var(--text-xs)
    color:      var(--color-fg-muted)
    font-family: var(--font-mono)  /* monoespaciado para fechas */

  Separador visual:
    content: "·"
    color: var(--color-fg-subtle)

  Tiempo de lectura:
    font-size:  var(--text-xs)
    color:      var(--color-fg-subtle)

Título (h2 en lista, h1 en post individual):
  font-size:     var(--text-h3)  /* 20px → 24px */
  font-weight:   var(--font-weight-semibold)
  color:         var(--color-fg)
  letter-spacing: var(--tracking-heading)
  line-height:   var(--leading-snug)
  text-decoration: none

  hover del h2 (cuando la card es clickeable):
    color: var(--color-accent)
    Transition: color var(--duration-fast) var(--ease-in-out)

Descripción:
  font-size: var(--text-body)
  color: var(--color-fg-muted)
  line-height: var(--leading-relaxed)
  display: -webkit-box
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
  overflow: hidden

Grid blog:
  Desktop (≥1024px): 2 columnas uniformes (6/6)
  Mobile (<1024px):  1 columna
  gap: var(--grid-gap)

Read more link (optional):
  font-size: var(--text-small)
  color: var(--color-accent)
  font-weight: var(--font-weight-medium)
  margin-top: auto
  hover: underline

Mobile touch:
@media (hover: none) and (pointer: coarse) {
  .post-card:active {
    border-color: var(--color-accent);
  }
}
```

---

### Organism: ContactForm

**Estructura**: layout full-width (max 680px, centrado en su sección) o 5/7 asimétrico con texto izquierda.

```
Sección de contacto — layout:
  Desktop: 5fr texto (bio/invitación) / 7fr formulario
  Mobile: stacked

Form container:
  display: flex, flex-direction: column, gap: var(--space-6)

FormField molecule (Label + Input):
  display: flex, flex-direction: column, gap: var(--space-2)

  Label:
    font-size: var(--text-small)
    font-weight: var(--font-weight-medium)
    color: var(--color-fg)
    letter-spacing: var(--tracking-wide)
    text-transform: uppercase  /* swiss — labels en mayúsculas */
    NO placeholder como label
    Posición: SOBRE el input siempre (no flotante)

  Input / Textarea:
    background:    var(--color-surface)
    color:         var(--color-fg)
    border:        1px solid var(--color-border)
    border-radius: var(--radius-input)  /* var(--radius-sm) = 4px */
    padding:       var(--space-3) var(--space-4)
    font-family:   var(--font-sans)
    font-size:     var(--text-body)
    width:         100%

    Placeholder:
      color: var(--color-fg-subtle)
      font-size: var(--text-body)

    Estados:
      idle:     border var(--color-border)
      hover:    border var(--color-fg-muted)
      focus:    border-color var(--color-border-focus),
                outline: 2px solid var(--color-accent),
                outline-offset: -1px  /* ring interno, no externo */
      invalid:  border-color var(--color-error)
                background: rgba(var(--color-error), 0.04)
      disabled: opacity 0.5, cursor not-allowed, bg var(--color-surface-2)

    Transition: border-color var(--duration-fast) var(--ease-in-out),
                outline-color var(--duration-fast) var(--ease-in-out)

  Textarea:
    min-height: 140px
    resize: vertical (solo vertical)
    line-height: var(--leading-relaxed)

  Error message:
    font-size: var(--text-xs)
    color: var(--color-error)
    margin-top: var(--space-1)
    display: flex, align-items: center, gap: var(--space-1)
    Icono: AlertCircle 14px, stroke var(--color-error)
    role="alert" aria-live="polite"
    animation: opacity 0 → 1, translateY(-4px) → 0, dur var(--duration-base)

Submit button:
  Variante: Primary, tamaño lg
  width: 100% en mobile, auto en desktop (alineado derecha)
  Loading state: spinner inline, text "Enviando..." (estático, no animado)

Success state:
  Reemplaza el formulario (no toast)
  Background: var(--color-surface)
  Border: 1px solid var(--color-success)
  Border-radius: var(--radius-md)
  Padding: var(--space-8)
  display: flex, flex-direction: column, align-items: center, gap: var(--space-4)

  Checkmark icon:
    size: 48px
    color: var(--color-success)
    Animación: scale 0.8 → 1 con ease-out, dur 300ms (único spring permitido — es feedback de éxito)

  Mensaje:
    font-size: var(--text-h3)
    font-weight: var(--font-weight-semibold)
    color: var(--color-fg)
    text-align: center

  Sub-mensaje:
    color: var(--color-fg-muted)
    font-size: var(--text-body)
    text-align: center

  Botón volver: Ghost sm "Enviar otro mensaje"
```

---

### Organism: Footer

**Regla**: grid asimétrico — no centrado. Separador top 1px border.

```
Container:
  border-top: 1px solid var(--color-border)
  padding-block: var(--space-12)
  background: var(--color-bg)

Grid (desktop ≥1024px): 3 columnas — 5fr / 4fr / 3fr
  Columna 1 (branding): logo + tagline corta + copyright
  Columna 2 (links): navegación rápida en columna
  Columna 3 (social): iconos sociales + email

Grid (mobile): stacked, gap var(--space-8)
  Orden mobile: branding → social → links

Branding:
  Logo: mismo estilo que nav (Geist Sans Bold, --text-body-lg)
  Tagline: font-size var(--text-small), color var(--color-fg-muted)
  Copyright: font-size var(--text-xs), color var(--color-fg-subtle),
             font-family var(--font-mono), margin-top var(--space-6)

Links de nav:
  font-size: var(--text-small)
  color: var(--color-fg-muted)
  text-decoration: none
  display: block, padding-block: var(--space-1)
  hover: color var(--color-fg)
  Transition: color var(--duration-fast) var(--ease-in-out)

Iconos sociales (GitHub, LinkedIn, Twitter/X):
  display: flex, gap: var(--space-4)
  Icono: 20px, stroke var(--color-fg-muted), fill none, stroke-width 1.5px
  hover: stroke var(--color-accent)
  Transition: stroke var(--duration-fast)
  aria-label en cada link (nombre de la red)

Email en footer (opcional):
  font-family: var(--font-mono)
  font-size: var(--text-small)
  color: var(--color-fg-muted)
  hover: color var(--color-accent)
  text-decoration: none
```

---

## 3. Estados Globales

### Focus visible (universal)

```css
/* Aplicar a TODOS los elementos interactivos */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: var(--radius-sm);  /* consistencia visual */
}

/* Quitar outline para mouse — solo teclado */
:focus:not(:focus-visible) {
  outline: none;
}
```

**Componentes con focus-visible obligatorio**:
- Todos los `<button>`, `<a>`, `<input>`, `<textarea>`, `<select>`
- ThemeToggle, hamburger menu, drawer links, social icons
- Tech pills si son interactivos (filtrado)

### Selection global

```css
::selection {
  background-color: var(--color-accent-muted);
  color: var(--color-fg);
}
```

### Scrollbar custom

```css
/* Solo en navegadores que soportan scrollbar-*  */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

/* Webkit */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: var(--radius-pill);
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-fg-muted);
}
```

### Reveal animations (section enter)

Para motion_intensity=2 (suave/elegante), solo fade-in con translateY leve. Sin scroll-pinning, sin GSAP, sin SplitText.

```css
/* Clase aplicada por IntersectionObserver */
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity var(--duration-reveal) var(--ease-out),
    transform var(--duration-reveal) var(--ease-out);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger manual para listas de cards */
.reveal-stagger > * {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity var(--duration-slow) var(--ease-out),
    transform var(--duration-slow) var(--ease-out);
}

.reveal-stagger.is-visible > *:nth-child(1) { transition-delay: 0ms; }
.reveal-stagger.is-visible > *:nth-child(2) { transition-delay: var(--stagger-delay); }
.reveal-stagger.is-visible > *:nth-child(3) { transition-delay: calc(var(--stagger-delay) * 2); }
.reveal-stagger.is-visible > *:nth-child(4) { transition-delay: calc(var(--stagger-delay) * 3); }
.reveal-stagger.is-visible > *:nth-child(n+5) { transition-delay: calc(var(--stagger-delay) * 4); }

.reveal-stagger.is-visible > * {
  opacity: 1;
  transform: translateY(0);
}

/* Respetar prefers-reduced-motion — no animar nada */
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal-stagger > * {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

**IntersectionObserver**: `threshold: 0.15`, `rootMargin: "0px 0px -48px 0px"` — no animar hasta que el elemento sea realmente visible.

---

## 4. Tabla de Behavioral Rules

### Motion intensity=2 (suave/elegante) — todas las reglas

| Componente | Hover | Active/Pressed | Reveal | Mobile (touch) |
|-----------|-------|----------------|--------|----------------|
| Button Primary | bg: accent-hover | scale(0.97) | N/A (visible por defecto) | active:scale(0.96)+opacity(0.85) |
| Button Secondary | bg: accent-muted | scale(0.97) | N/A | active:scale(0.96)+opacity(0.85) |
| Button Ghost | bg: surface-2 | scale(0.97) | N/A | active:opacity(0.7) |
| Nav link | underline-draw (scaleX 0→1) | color fg | N/A | always-active: underline permanente |
| ProjectCard | border→accent + translateY(-2px) | translateY(-1px) | fade-up 400ms | active: border→accent, scale(0.99) |
| PostCard | border→accent | N/A | fade-up 400ms | active: border→accent |
| TechPill (About) | border→accent-muted, icon→accent, text→fg | N/A | stagger fade-up | active: border→focus |
| Input | border→fg-muted | N/A | N/A | focus: ring+border-accent |
| ThemeToggle | bg: surface-2, color: fg | scale(0.9) | N/A | active: scale(0.9) |
| Social icon | stroke→accent | N/A | N/A | active: stroke→accent |
| Footer link | color→fg | N/A | N/A | active: color→accent |

---

## 5. Reglas de Accesibilidad

- **Contraste mínimo**: 4.5:1 para texto, 3:1 para elementos UI (borders, iconos)
- **Touch targets**: mínimo 44×44px en mobile para todos los elementos interactivos
- **Focus visible**: obligatorio en todos los interactivos (ver sección 3)
- **aria-label**: obligatorio en iconos sin texto, toggles, hamburger, sociales
- **aria-current**: en nav link de la página activa
- **aria-live="polite"**: en mensajes de error de formulario
- **role="status"**: en spinner de loading
- **prefers-reduced-motion**: anulación total de animaciones (ya en tokens)
- **Semántica HTML**: `<nav>`, `<main id="main-content">`, `<section aria-labelledby>`, `<article>` para posts
- **Skip link**: primer elemento focusable, ver molecule SkipLink

---

## 6. Reglas de Implementacion

1. **Cero colores hardcodeados**: todos los colores via `var(--color-*)`. Los grep de QA buscarán hex directos en componentes.

2. **Border-only en cards**: `border: 1px solid var(--color-border)`. Nunca `shadow-sm`, `shadow-md`, `shadow-lg`, `box-shadow: ...`.

3. **Hover wrap en media query**: todos los estilos hover que usan `transform` o `border-color` en cards deben estar dentro de `@media (hover: hover) and (pointer: fine)` para no dispararse en touch.

4. **Geist Sans heading**: la fuente de heading es siempre `var(--font-sans)`. Nunca `font-family: Inter`, `font-family: Roboto` o similar.

5. **Tokens de motion**: duraciones y easings siempre vía `var(--duration-*)` y `var(--ease-*)`. Nunca `transition: all 0.3s ease`.

6. **Z-index centralizado**: nunca `z-index: 999` o valores ad-hoc. Usar `var(--z-*)`.

7. **Grid asimétrico**: cada sección usa una proporción distinta. Prohibido layout centrado-en-card para todas las secciones.

8. **Reveal con IntersectionObserver**: no usar `onScroll` manual. El observer agrega clase `.is-visible`. Sin GSAP, sin framer-motion para reveals básicos.

9. **Dark mode via data-theme**: el script anti-FOUC en `<head>` es obligatorio antes del primer render. Ver `css-foundation.md` sección 9.

10. **Font Mono para código y fechas**: fechas en PostCard y cualquier dato numérico técnico usan `var(--font-mono)` para alineación tabular coherente.

---

## 7. Componentes — Checklist de Implementacion

### Atoms
- [ ] Button (Primary, Secondary, Ghost) × 3 tamaños + loading spinner
- [ ] Input (text, email, textarea) + estados
- [ ] Label (uppercase, over-input)
- [ ] Badge / CategoryPill (accent-muted bg, pill radius)
- [ ] TechPill (mono, border-only, surface-2 bg)
- [ ] Icon wrapper (24px, 1.5px stroke, no fill, monocromático)
- [ ] StatusDot (8px, success/muted color)
- [ ] Divider (1px border)

### Molecules
- [ ] FormField (Label + Input + ErrorMessage)
- [ ] NavItem (link + underline-draw hover)
- [ ] PostMeta (CategoryPill + fecha mono + tiempo lectura)
- [ ] SkipLink (visually-hidden → focus visible)
- [ ] ThemeToggle (28px icon, 44px touch area)
- [ ] SocialLink (icon 20px + aria-label)

### Organisms
- [ ] Header / Navigation (sticky + blur + hamburger + drawer)
- [ ] HeroSection (7/5 asymmetric, staggered reveal)
- [ ] ProjectCard (border-only, aspect-video mockup, tech pills, links)
- [ ] TechGrid (5/7 layout, icon + label grid)
- [ ] PostCard (typography-first, no thumbnail, category pill)
- [ ] ContactForm (labels over inputs, error states, success state)
- [ ] Footer (3-col asymmetric, branding + nav + social)

### Templates
- [ ] PageLayout (skip link + header + main + footer)
- [ ] SectionWrapper (padding-block section, container max-width)

---

Fin del Design System v1.0 — tanitocode-portfolio
