# tanitocode-portfolio

Portfolio personal de TanitoCode — desarrollador fullstack.

## Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm 10+

## Setup local

```bash
# 1. Clonar el repositorio
git clone https://github.com/tanitocode/tanitocode-portfolio.git
cd tanitocode-portfolio

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# 4. Correr migraciones de base de datos
npm run db:migrate

# 5. Iniciar servidor de desarrollo
npm run dev
```

El proyecto estara disponible en [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Descripcion |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo (Next.js) |
| `npm run build` | Build de produccion |
| `npm run start` | Servidor de produccion (requiere build previo) |
| `npm run lint` | Lint con ESLint |
| `npm run lint:fix` | Lint + auto-fix |
| `npm run format` | Formatear codigo con Prettier |
| `npm run type-check` | Verificacion de tipos TypeScript |
| `npm run test` | Tests en modo watch (Vitest) |
| `npm run test:run` | Tests en modo one-shot |
| `npm run db:generate` | Generar migraciones Drizzle |
| `npm run db:migrate` | Aplicar migraciones |
| `npm run db:studio` | Abrir Drizzle Studio (GUI de DB) |

## Tech stack

- **Framework**: Next.js 15/16 (App Router, TypeScript)
- **Estilos**: Tailwind CSS v4
- **DB**: PostgreSQL + Drizzle ORM
- **Contenido**: MDX (posts del blog)
- **Fuentes**: Geist Sans / Geist Mono
- **Testing**: Vitest + Testing Library

## Estructura

```
src/
  app/              # App Router — layouts, pages, rutas
  components/
    ui/             # Componentes atomicos (Button, Badge, etc.)
    layout/         # Header, Footer, Nav
    sections/       # Secciones de paginas (Hero, Projects, etc.)
    blog/           # Componentes especificos del blog
    seo/            # Componentes meta/SEO
  lib/
    db/             # Drizzle schema + cliente
    validations/    # Schemas Zod
  hooks/            # Custom React hooks
  types/            # TypeScript types globales
  __tests__/        # Tests Vitest
public/
  projects/         # Assets de proyectos
content/
  posts/            # Posts MDX del blog
```

## Variables de entorno

Ver `.env.example` para las variables requeridas:

- `DATABASE_URL` — Connection string de PostgreSQL
- `HASH_SALT` — Salt para hashing (generar con `openssl rand -hex 32`)
