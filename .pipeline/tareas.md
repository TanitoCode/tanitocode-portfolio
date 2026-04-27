# Tareas — tanitocode-portfolio
Fecha: 2026-04-22
Total: 17 tareas | Tiempo estimado: ~12 horas
Stack detectado: Next.js 16 (App Router) + Tailwind v4 + Drizzle + PostgreSQL + MDX
Estructura: single-repo

## Gaps identificados
- Contenido real bio/experiencia: se usan placeholders (se sustituirán por el usuario post-entrega)
- CV PDF real: se deja placeholder (`/public/cv-tanitocode.pdf` con contenido dummy)
- Proyectos reales: se usan 3 placeholders genéricos (nombre/descripción/repo URL dummy)
- Posts MDX: 2 artículos con contenido técnico genérico (Next.js + PostgreSQL patterns)
- URL de producción / dominio final: no definido — meta tags usan `https://tanitocode.dev` como placeholder
- GITHUB/LINKEDIN URLs: se dejan como `https://github.com/tanitocode` / `https://linkedin.com/in/tanitocode` placeholder
- Dark mode: SÍ habilitado por default (según spec — "opcional", se incluye por calidad)

## Anti-patterns HIGH (obligatorios en TODAS las tareas UI)
- NO teal SaaS (#14B8A6, #2DD4BF, etc.) — paleta electric dark blue (#1E40FF / #2563EB)
- NO Inter como heading font — usar Geist Sans/Display
- NO card shadows blandos (`shadow-sm`, `shadow-md`, `shadow-lg` uniformes) — border-only o contrast-based
- NO hero con imagen stock — typography-first
- NO gradientes múltiples — acento único azul eléctrico
- NO animaciones llamativas — solo fade-in suaves + hover elegante
- NO centered-card-everywhere — asimetría intencional permitida

---

## Grupo A: Setup & Estructura (3 tareas)

### task-01: Infrastructure base + Next.js 16 init
**Agente**: rapid-prototyper
**Tipo**: config
**Descripción**: Inicializar proyecto Next.js 16 con App Router, TypeScript, Tailwind v4, ESLint, Prettier, Husky + lint-staged, estructura de carpetas estandarizada.
**Archivos esperados**:
- `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts` (v4 inline config)
- `.eslintrc.json`, `.prettierrc`, `.editorconfig`, `.gitignore`, `.env.example`
- `.husky/pre-commit`, `lint-staged` config
- `README.md` con setup local + scripts + estructura
- `vitest.config.ts` + script `test` en package.json
- Estructura: `src/app/`, `src/components/ui/`, `src/components/{feature}/`, `src/lib/`, `src/hooks/`, `src/types/`, `src/__tests__/`, `public/`, `content/posts/`
**Criterios de aceptación**:
- `npm run dev` arranca sin errores en puerto 3000
- `npm run lint` pasa sin errores
- `npm run build` completa sin errores
- `npm test` existe (sin tests aún OK)
- README tiene instrucciones de setup completas (clone, install, .env, dev, build, scripts)
- Next.js 16 usa `proxy.ts` (no `middleware.ts`) — archivo creado vacío con comentario placeholder
**Dependencias**: ninguna

### task-02: Drizzle + PostgreSQL + MDX setup
**Agente**: backend-architect
**Tipo**: config
**Descripción**: Configurar Drizzle ORM con PostgreSQL (driver `postgres.js`), pipeline MDX con `@next/mdx`, schema base, migraciones.
**Archivos esperados**:
- `src/lib/db/index.ts` (client Drizzle con postgres.js)
- `src/lib/db/schema.ts` (tabla `contact_messages` vacía por ahora)
- `drizzle.config.ts`
- `src/mdx-components.tsx` (MDX components default)
- `next.config.ts` actualizado con `pageExtensions: ['tsx', 'mdx']` y `withMDX`
- Scripts en package.json: `db:generate`, `db:migrate`, `db:studio`
- `.env.example` con `DATABASE_URL=postgresql://...`
**Criterios de aceptación**:
- `npm run db:generate` produce migración válida
- `npm run db:migrate` ejecuta contra PostgreSQL local sin errores
- MDX compila: `test.mdx` en `content/posts/` se puede importar y renderizar
- `drizzle.config.ts` usa `postgres` dialect con `prepare: false` (Supabase-compatible si se migra a prod)
- Conexión DB usa variable `DATABASE_URL` (nunca hardcoded)
**Dependencias**: task-01

### task-03: Fuentes Geist + config base de assets
**Agente**: frontend-developer
**Tipo**: config
**Descripción**: Instalar y configurar Geist Sans + Geist Mono (via `geist` npm package) como fuentes globales, configurar favicon, og-image placeholder, manifest PWA básico.
**Archivos esperados**:
- `src/app/layout.tsx` (importa `GeistSans` y `GeistMono`)
- `src/app/fonts.ts` (exporta instancias)
- `public/favicon.ico`, `public/icon.png`, `public/apple-icon.png`
- `public/og-image.png` (placeholder 1200x630)
- `src/app/manifest.ts` (PWA básico)
**Criterios de aceptación**:
- Geist se carga via `next/font` (sin FOUT)
- `<html>` tiene `className` con `GeistSans.variable` y `GeistMono.variable`
- `font-family` Inter NO aparece en ningún archivo (grep `Inter` → 0 resultados)
- Favicon visible en tab del browser
- `/manifest.webmanifest` responde 200
**Dependencias**: task-01

---

## Grupo B: Fundación visual (2 tareas)

### task-04: CSS tokens + design system swiss-minimal
**Agente**: frontend-developer
**Tipo**: frontend
**Descripción**: Definir tokens CSS globales (colores electric blue, spacing, typography scale, radii, motion), implementar dark mode con `prefers-color-scheme` + toggle manual.
**Archivos esperados**:
- `src/app/globals.css` con tokens CSS custom properties
- `src/lib/theme.ts` (utilities para theme toggle)
- `src/components/ui/theme-toggle.tsx` (componente toggle accesible)
- `tailwind.config.ts` extendido con tokens custom
**Criterios de aceptación**:
- Tokens definidos: `--color-accent: #1E40FF` (light) / `#2563EB` (dark), `--color-bg`, `--color-fg`, `--color-border`, `--color-muted`
- Typography scale: display (56-80px), h1 (40-56px), h2 (28-36px), body (16-18px), small (13-14px)
- Spacing scale: 4/8/12/16/24/32/48/64/96/128px
- Dark mode funciona: toggle cambia `data-theme="dark"` en `<html>` y persiste en localStorage
- grep `teal|#14B8A6|#2DD4BF|#5EEAD4` → 0 resultados
- grep `shadow-sm|shadow-md|shadow-lg` en componentes → 0 resultados (solo `border` o `ring`)
**Dependencias**: task-03

### task-05: Layout global (nav + footer)
**Agente**: frontend-developer
**Tipo**: frontend
**Descripción**: Nav sticky con logo textual "tanitocode", links (Sobre mí, Proyectos, Blog, Contacto), theme toggle. Footer minimal con copyright + links sociales + built-with.
**Archivos esperados**:
- `src/components/layout/nav.tsx`
- `src/components/layout/footer.tsx`
- `src/app/layout.tsx` actualizado con `<Nav />` y `<Footer />`
**Criterios de aceptación**:
- Nav sticky en top, blur backdrop sutil al hacer scroll
- Logo "tanitocode" con font Geist Sans, weight 700, sin imagen
- Links con hover underline animado (no outline, no shadow)
- Nav es responsive: mobile muestra hamburger → drawer
- Footer tiene 3 secciones: branding izquierda, links sociales centro/derecha, copyright abajo
- Grid layout asimétrico (no centered-card)
- Accesible: `<nav aria-label>`, skip-to-content link
**Dependencias**: task-04

---

## Grupo C: Secciones principales (6 tareas)

### task-06: Hero section
**Agente**: frontend-developer
**Tipo**: frontend
**Descripción**: Hero full-viewport con typography-first: nombre grande (display), título "Desarrollador Fullstack" en acento, frase breve, 2 CTAs ("Ver proyectos" → `#proyectos`, "Contactame" → `/contacto`), fade-in entrada staggered.
**Archivos esperados**:
- `src/components/sections/hero.tsx`
- `src/app/page.tsx` (home page que importa Hero)
**Criterios de aceptación**:
- Typography-first: nombre en display (56-80px Geist), título en acento #1E40FF, frase en muted
- NO imagen stock en el hero — solo texto + sutil grain/noise opcional
- Fade-in staggered: h1 → h2 → párrafo → CTAs (delays 0/100/200/300ms)
- CTAs: primario (filled azul eléctrico) + secundario (border-only)
- Responsive: mobile stackea CTAs en columna
- Viewport full height en desktop, auto en mobile (min-h-[90vh])
- Layout asimétrico: bloque de texto alineado a la izquierda, espacio negativo intencional a la derecha
- grep `stock|unsplash|picsum` en hero → 0 resultados
**Dependencias**: task-05

### task-07: Sobre mí section
**Agente**: frontend-developer
**Tipo**: frontend
**Descripción**: Sección "Sobre mí" con bio placeholder (2 párrafos), stack icons (React, Next.js, Node.js, PostgreSQL, TypeScript, Drizzle, Tailwind), años experiencia (placeholder "5+ años").
**Archivos esperados**:
- `src/components/sections/about.tsx`
- `src/lib/stack-data.ts` (array de stack items con nombre, icon-slug)
- `src/components/ui/stack-icon.tsx` (renderiza SVG inline via `simple-icons` o paths custom)
**Criterios de aceptación**:
- Bio placeholder visible: 2 párrafos con texto genérico marcado como `TODO: reemplazar`
- Stack icons: mínimo 7 iconos en grid (React, Next.js, Node, PostgreSQL, TypeScript, Drizzle, Tailwind)
- Iconos SVG inline (no imágenes externas), monocromáticos con color acento en hover
- Años experiencia como stat destacado ("5+" en display, "años construyendo" en body)
- Layout 2-columnas desktop (texto izquierda, stack derecha), 1-columna mobile
- grep `shadow-sm|shadow-md` en componente → 0 resultados
**Dependencias**: task-05

### task-08: Proyectos — grilla con filtro
**Agente**: frontend-developer
**Tipo**: frontend
**Descripción**: Grilla de 3 proyectos placeholder con nombre/descripción/techs/mockup/links (demo + GitHub). Filtro por tech (React, Next.js, etc.) o tipo (frontend, fullstack, backend) usando `useState` + query params (sincroniza en URL).
**Archivos esperados**:
- `src/components/sections/projects.tsx`
- `src/components/ui/project-card.tsx`
- `src/components/ui/project-filter.tsx`
- `src/lib/projects-data.ts` (3 proyectos placeholder)
- `public/projects/` (3 mockup placeholders SVG o PNG con gradiente simple)
**Criterios de aceptación**:
- 3 proyectos placeholder visibles: nombre, descripción 2 líneas, 3-5 techs como pills, mockup image, 2 links (Demo ↗ + GitHub ↗)
- Filtros: botones togglea por tech (React, Next.js, Node) y tipo (Frontend, Fullstack)
- Filtro activo se refleja en URL (`?tech=react&tipo=fullstack`)
- Cards usan `border` (no shadow), hover eleva sutil con `translateY(-2px)` + border color → acento
- Grid: 3 cols desktop, 2 tablet, 1 mobile
- Empty state si ningún proyecto matchea filtro: "No hay proyectos con esos filtros — [Limpiar filtros]"
- Links abren en nueva tab con `rel="noopener noreferrer"`
- grep `picsum|lorem|unsplash` → 0 resultados
**Dependencias**: task-05

### task-09: Blog listado
**Agente**: frontend-developer
**Tipo**: frontend
**Descripción**: Listado de artículos del blog en `/blog` leyendo MDX de `content/posts/*.mdx`. Cada card muestra título, fecha, categoría, resumen. Link a página individual.
**Archivos esperados**:
- `src/app/blog/page.tsx`
- `src/lib/blog.ts` (utility para leer y parsear frontmatter de MDX)
- `src/components/ui/post-card.tsx`
**Criterios de aceptación**:
- `/blog` renderiza listado con al menos 2 posts (se crearán en task-14)
- Cada post card: título (h2), fecha formateada (`22 abr 2026`), categoría como pill, resumen 2 líneas
- Orden cronológico descendente (más reciente arriba)
- Metadata leída de frontmatter MDX (`title`, `date`, `category`, `summary`, `slug`)
- Empty state si no hay posts: "Próximamente: artículos técnicos en desarrollo"
- Grid 2-cols desktop, 1-col mobile
- Typography-first: NO mockup/thumbnail en cards
**Dependencias**: task-02, task-05

### task-10: Blog artículo individual
**Agente**: frontend-developer
**Tipo**: frontend
**Descripción**: Página dinámica `/blog/[slug]` que renderiza un MDX post específico con layout de lectura (ancho acotado 65ch, tipografía jerárquica).
**Archivos esperados**:
- `src/app/blog/[slug]/page.tsx`
- `src/components/blog/mdx-layout.tsx`
- `src/components/blog/post-header.tsx` (título, fecha, categoría, tiempo lectura)
- `src/mdx-components.tsx` actualizado con styling de h1-h6, p, code, pre, blockquote, ul/ol
**Criterios de aceptación**:
- `/blog/[slug]` resuelve correctamente para los 2 posts placeholder
- Ancho de lectura: `max-width: 65ch`
- Tiempo de lectura calculado automáticamente (`words / 200`)
- Code blocks con syntax highlighting (usar `shiki` o `rehype-pretty-code`)
- `<h2>`, `<h3>` con anchors auto-generados
- Link "← Volver al blog" en top
- generateStaticParams implementado para SSG de todos los posts
- 404 si slug no existe
**Dependencias**: task-09

### task-11: Contacto — formulario + route handler
**Agente**: backend-architect
**Tipo**: fullstack
**Descripción**: Página `/contacto` con formulario (nombre, email, mensaje), route handler `POST /api/contact` que valida con Zod, guarda en PostgreSQL vía Drizzle, responde JSON. Links sociales (GitHub/LinkedIn/email) + botón descarga CV.
**Archivos esperados**:
- `src/app/contacto/page.tsx`
- `src/components/sections/contact-form.tsx`
- `src/components/sections/contact-links.tsx`
- `src/app/api/contact/route.ts` (POST handler)
- `src/lib/validations/contact.ts` (schema Zod)
- `src/lib/db/schema.ts` actualizado con tabla `contact_messages`
**Criterios de aceptación**:
- Form campos: `nombre` (min 2), `email` (formato válido), `mensaje` (min 10, max 2000) — validación client + server con Zod
- POST `/api/contact` responde 200 OK + `{success: true}` en éxito, 400 + `{errors: [...]}` en validación, 500 en error server
- Mensaje se persiste en tabla `contact_messages` (id, nombre, email, mensaje, created_at)
- Estados del form: idle → submitting (disabled + spinner) → success (mensaje verde) → error (mensaje rojo con retry)
- Links sociales visibles: GitHub, LinkedIn, email `mailto:` — iconos SVG inline
- Botón "Descargar CV" apunta a `/cv-tanitocode.pdf` con atributo `download`
- Honeypot anti-spam (campo oculto `website` que si viene lleno rechaza)
- Rate limiting básico: max 3 requests / IP / hora (almacenar en tabla o in-memory con TTL)
**Dependencias**: task-02, task-05

---

## Grupo D: Datos y contenido (2 tareas)

### task-12: Schema DB + migración contact_messages
**Agente**: backend-architect
**Tipo**: backend
**Descripción**: Finalizar schema Drizzle para `contact_messages`, generar y aplicar migración, crear seed opcional vacío.
**Archivos esperados**:
- `src/lib/db/schema.ts` (tabla completa)
- `src/lib/db/migrations/0000_initial.sql` (generado)
- `src/lib/db/seed.ts` (script opcional)
**Criterios de aceptación**:
- Tabla `contact_messages`: `id` (uuid, pk), `nombre` (text, not null), `email` (text, not null), `mensaje` (text, not null), `created_at` (timestamp, default now), `ip_hash` (text, nullable para rate limit)
- Migración aplica sin errores contra PostgreSQL limpio
- `npm run db:studio` abre drizzle studio y muestra tabla vacía
- Índice en `created_at` para ordenar + consultas de rate limit
**Dependencias**: task-02

### task-13: Seed de proyectos placeholder
**Agente**: frontend-developer
**Tipo**: frontend
**Descripción**: Crear 3 proyectos placeholder estáticos en `src/lib/projects-data.ts` con datos realistas-pero-dummy, generar 3 mockups SVG placeholder con branding del proyecto (no stock).
**Archivos esperados**:
- `src/lib/projects-data.ts` (array exportado)
- `public/projects/project-01.svg`, `project-02.svg`, `project-03.svg`
**Criterios de aceptación**:
- 3 proyectos con: `slug`, `name`, `description` (2 líneas), `techs` (array 3-5 strings), `type` (`frontend|fullstack|backend`), `mockupUrl`, `demoUrl`, `githubUrl`, `year`
- Techs distintas entre proyectos para que filtro tenga variedad (ej: P1=React+Next, P2=Node+PostgreSQL+Hono, P3=React+TypeScript+Tailwind)
- Mockups SVG: composición geométrica con color acento #1E40FF + grays, NO stock photos, NO picsum
- Texto descriptivo placeholder marcado como `TODO: reemplazar por proyecto real`
- Data tipada con interface `Project` exportada
**Dependencias**: task-08

### task-14: 2 posts MDX placeholder
**Agente**: frontend-developer
**Tipo**: frontend
**Descripción**: Crear 2 artículos MDX técnicos placeholder en `content/posts/` con frontmatter completo y contenido técnico realista (Next.js + PostgreSQL).
**Archivos esperados**:
- `content/posts/01-drizzle-vs-prisma.mdx`
- `content/posts/02-nextjs-16-app-router-patterns.mdx`
**Criterios de aceptación**:
- Frontmatter completo: `title`, `date` (ISO), `category`, `summary` (140 chars), `slug`
- Contenido mínimo 800 palabras cada uno
- Uso de h2/h3 + párrafos + 2+ code blocks (TypeScript)
- Cada post incluye al menos 1 lista ordenada + 1 blockquote
- Code blocks con lenguaje especificado (```ts, ```sql)
- Categorías: "Backend" y "Frontend" respectivamente
- Contenido técnico coherente (NO lorem ipsum)
- Tag `TODO: reemplazar` visible al inicio del body
**Dependencias**: task-10

---

## Grupo E: Polish & QA-ready (3 tareas)

### task-15: Dark mode completo + responsive audit
**Agente**: frontend-developer
**Tipo**: frontend
**Descripción**: Verificar que TODOS los componentes respetan dark mode (tokens CSS, no colores hardcoded), hacer audit responsive en mobile/tablet/desktop, ajustar breakpoints donde falte.
**Archivos esperados**:
- Modificaciones en todos los componentes de `src/components/sections/` y `src/components/ui/`
- `src/components/ui/theme-toggle.tsx` refinado
**Criterios de aceptación**:
- Toggle theme cambia TODA la UI sin flashes (FOUC mitigado con script inline en `<head>`)
- grep de colores hardcoded (`#fff|#000|rgb\(|white;|black;`) en `src/components/` → 0 resultados críticos (solo en tokens)
- Todas las secciones se ven correctas en: 375px (mobile), 768px (tablet), 1280px (desktop), 1920px (wide)
- Nav drawer mobile funciona correctamente
- Hero CTAs stackean en mobile
- Grid de proyectos ajusta columnas responsivamente
- Form contacto usable en mobile (inputs 100% width)
- Theme persiste en localStorage (`theme=dark|light|system`)
**Dependencias**: task-06, task-07, task-08, task-09, task-10, task-11

### task-16: Animaciones + micro-interacciones
**Agente**: frontend-developer
**Tipo**: frontend
**Descripción**: Implementar fade-in suaves on-scroll (IntersectionObserver o `motion/react`), hover elegante en cards/links/CTAs, focus states accesibles, respeto a `prefers-reduced-motion`.
**Archivos esperados**:
- `src/hooks/use-fade-in.ts` (custom hook)
- `src/components/ui/fade-in.tsx` (wrapper)
- Modificaciones en project-card, post-card, hero, about
**Criterios de aceptación**:
- Secciones al hacer scroll hacen fade-in + translateY(8px → 0) una sola vez (no en cada scroll)
- Duración ≤ 400ms, easing `ease-out` o `cubic-bezier(0.2, 0.8, 0.2, 1)`
- Hover en cards: `translateY(-2px)` + border color → acento, transition 200ms
- Hover en links: underline animado (transform scaleX 0→1)
- Focus states: `ring-2 ring-accent` visible en TODOS los elementos interactivos
- `@media (prefers-reduced-motion: reduce)` desactiva todas las animaciones (duration → 0.01ms)
- grep `animate-bounce|animate-spin|animate-pulse` uso decorativo → 0 resultados (solo spinner en form submitting)
- grep `motion/react|framer-motion` OK si usado, pero bundle check: Framer adds <30KB gzip si se usa
**Dependencias**: task-15

### task-17: SEO + meta tags + favicons + CV placeholder
**Agente**: frontend-developer
**Tipo**: frontend
**Descripción**: Meta tags completos (Open Graph, Twitter Cards, canonical, robots), `sitemap.xml` y `robots.txt`, JSON-LD Person schema, CV placeholder PDF en `/public`, favicons multi-size.
**Archivos esperados**:
- `src/app/layout.tsx` actualizado con `metadata` export
- `src/app/blog/[slug]/page.tsx` con `generateMetadata` dinámico
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/components/seo/json-ld.tsx` (Person schema)
- `public/cv-tanitocode.pdf` (PDF placeholder dummy)
- `public/favicon.ico`, `icon.png`, `icon-192.png`, `icon-512.png`, `apple-icon.png`
- `public/og-image.png` (1200x630 con branding azul eléctrico)
**Criterios de aceptación**:
- Home `<title>`: "TanitoCode — Desarrollador Fullstack"
- Meta description 140-160 chars
- Open Graph completo: og:title, og:description, og:image, og:url, og:type, og:site_name
- Twitter Cards: `summary_large_image` con og-image
- Canonical URL en cada página
- JSON-LD Person schema con `@type: Person`, `name`, `jobTitle`, `url`, `sameAs` (GitHub, LinkedIn)
- `/sitemap.xml` responde 200 con URLs del home, /contacto, /blog, /blog/[slug] por cada post
- `/robots.txt` permite indexación + apunta a sitemap
- CV PDF descargable en `/cv-tanitocode.pdf` (contenido dummy válido)
- Favicon visible en tab + iOS bookmark + Android PWA
- Lighthouse SEO score ≥ 90 en home (test manual)
- og-image 1200x630 con nombre + título + color acento (NO stock)
**Dependencias**: task-15, task-16

---

## Orden de ejecución (respetando dependencias)

1. task-01 (setup Next.js)
2. task-02 (Drizzle + MDX) + task-03 (fuentes Geist) — paralelo posible
3. task-04 (CSS tokens + dark mode)
4. task-05 (layout global)
5. task-06, task-07, task-08, task-09, task-11 (secciones — pueden paralelizarse)
6. task-10 (blog artículo — depende de task-09)
7. task-12 (schema DB final)
8. task-13 (seed proyectos), task-14 (posts MDX) — paralelo
9. task-15 (dark mode + responsive audit)
10. task-16 (animaciones)
11. task-17 (SEO + CV + favicons)

## Riesgos detectados

1. **Next.js 16 MDX compat**: `@next/mdx` puede requerir config adicional en v16 — task-02 debe validar compilación antes de avanzar
2. **PostgreSQL local**: requiere que el usuario tenga Postgres corriendo localmente (puerto 5432) — README debe documentarlo; alternativa: docker-compose.yml opcional
3. **Geist font**: paquete `geist` debe ser compatible con Next 16 — si hay issues, fallback a `next/font/google` con fuente similar (NO Inter)
4. **Rate limiting en-memoria**: se pierde en restart — aceptable para portfolio, documentar como limitación
5. **Dark mode FOUC**: requiere script inline en `<head>` para evitar flash — task-04 debe incluirlo explícitamente
6. **grep anti-patterns en task-04, task-06, task-08**: son gates duros — si fallan, el evidence-collector rechazará la tarea

## Total
- **17 tareas** cubriendo infraestructura, backend, frontend, contenido y polish
- **Tiempo estimado**: ~12 horas de ejecución secuencial (menos con paralelización del Grupo C)
- **Cobertura**: 100% de las secciones del spec (Hero, Sobre mí, Proyectos, Blog, Contacto) + setup completo + SEO + dark mode
