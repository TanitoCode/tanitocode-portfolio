# Security Spec — tanitocode-portfolio

**Proyecto**: Portfolio personal con formulario de contacto
**Stack**: Next.js 16 App Router + PostgreSQL (Drizzle ORM) + Vercel
**Superficie de ataque pública**: `POST /api/contact` (única ruta que muta estado)
**Sin autenticación de usuarios** — sin login, sin panel admin, sin sesiones
**Fecha**: 2026-04-23

---

## 1. STRIDE Threat Model

Modelo simplificado dado que la única superficie mutable es el formulario de contacto.

| # | Amenaza | Categoría STRIDE | Componente | Riesgo | Mitigación concreta |
|---|---------|------------------|------------|--------|---------------------|
| T1 | Spam masivo / flooding del formulario | DoS + Tampering | `POST /api/contact` | ALTO | Rate limit 3 req/IP/hora + honeypot field + Zod schema strict |
| T2 | SQL Injection vía campos `name/email/message` | Tampering | Drizzle ORM → PostgreSQL | ALTO | Drizzle parameterized queries (NUNCA `sql.raw()` con user input) |
| T3 | XSS persistente (mensaje malicioso renderizado en admin futuro) | Tampering | Storage de `messages` | MEDIO | Sanitización HTML en input + escape al render. CSP estricta |
| T4 | DoS por payloads gigantes | DoS | `POST /api/contact` | MEDIO | `bodyParser` limit 10KB + Zod `.max()` por campo |
| T5 | Email injection (CRLF en header `from`) si se envía notificación | Tampering | Email transport (futuro) | MEDIO | Validar email con regex estricta, rechazar `\r\n` en cualquier campo |
| T6 | Doxxing / leak de IP de visitantes | Information Disclosure | Tabla `messages` | MEDIO | Hashear IP con SHA-256 antes de persistir, NUNCA guardar IP raw |
| T7 | Enumeración de submissions vía timing | Information Disclosure | `/api/contact` response | BAJO | Response time constante: siempre 200 OK genérico, sin filtrar errores |
| T8 | Tab-nabbing en links externos del portfolio | Spoofing | Frontend (links a GitHub/LinkedIn/proyectos) | BAJO | Todos los `target="_blank"` con `rel="noopener noreferrer"` |
| T9 | Clickjacking del formulario | Tampering | Página de contacto | BAJO | `X-Frame-Options: SAMEORIGIN` + CSP `frame-ancestors 'self'` |
| T10 | Supply chain attack (lockfile envenenado) | Tampering | `package-lock.json` | MEDIO | `lockfile-lint` en CI antes de deploy |
| T11 | Source maps expuestos en producción | Information Disclosure | Build output | BAJO | Verificar `productionBrowserSourceMaps: false` en `next.config.ts` |
| T12 | Repudiation de mensajes recibidos | Repudiation | Tabla `messages` | BAJO | Timestamp inmutable + `ip_hash` + `user_agent_hash` para audit trail |

**Amenazas N/A** (sin auth → no aplican):
- Spoofing de identidad de usuario
- Privilege escalation
- Session hijacking
- CSRF en endpoints autenticados (el único POST público no requiere auth — el rate limit + honeypot lo cubre)

---

## 2. Security Headers

### Implementación recomendada: `vercel.json` (deploy en Vercel)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://vitals.vercel-insights.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests"
        }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-store, max-age=0"
        },
        {
          "key": "X-Robots-Tag",
          "value": "noindex, nofollow"
        }
      ]
    }
  ]
}
```

### Justificación de la CSP

| Directiva | Valor | Razón |
|-----------|-------|-------|
| `default-src 'self'` | self | Default deny para todo lo no especificado |
| `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com` | + Vercel | Next.js 16 inyecta inline scripts para hydration + Vercel Analytics. **Eventual hardening**: migrar a nonces (`script-src 'self' 'nonce-{random}'`) cuando Next.js soporte CSP nonces estable |
| `style-src 'self' 'unsafe-inline'` | + inline | next/font + styled-jsx requieren inline styles |
| `img-src 'self' data: blob: https:` | permisivo | OG images, avatars de proyectos, screenshots |
| `font-src 'self' data:` | self + data | next/font sirve self-hosted con data URIs ocasionales |
| `connect-src 'self' https://vitals.vercel-insights.com` | self + Vercel | Vercel Web Vitals beacon |
| `frame-ancestors 'self'` | self | Refuerza X-Frame-Options |
| `object-src 'none'` | none | Bloquea Flash/applets legacy |
| `upgrade-insecure-requests` | on | Auto-upgrade HTTP a HTTPS |

### Headers adicionales en `next.config.ts` (defensa en profundidad)

```ts
// next.config.ts
const nextConfig = {
  productionBrowserSourceMaps: false, // T11
  poweredByHeader: false,             // No filtrar "X-Powered-By: Next.js"
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '10kb',           // T4
    },
  },
};
```

---

## 3. OWASP Top 10 — Checklist aplicado

| # | Item | Aplica | Mitigación específica al proyecto |
|---|------|--------|-----------------------------------|
| **A01** | Broken Access Control | NO | Sin autenticación ni recursos protegidos. Todo el contenido es público |
| **A02** | Cryptographic Failures | SÍ | HSTS preload + HTTPS-only en Vercel + `DATABASE_URL` con `sslmode=require` + IP hashing con SHA-256 |
| **A03** | Injection | SÍ — **CRÍTICO** | Drizzle ORM con queries parametrizadas. **Prohibido** `sql.raw()`, `db.execute(sql\`...\${userInput}\`)`. Zod schema valida tipos antes de tocar DB. HTML escape al render |
| **A04** | Insecure Design | SÍ | Threat model documentado (sección 1). Honeypot + rate limit diseñados desde Fase 2 |
| **A05** | Security Misconfiguration | SÍ — **CRÍTICO** | Headers en `vercel.json` (sección 2). `X-Powered-By` desactivado. Source maps off en prod. `.env.local` en `.gitignore`. Sin `cors` wildcard |
| **A06** | Vulnerable Components | SÍ | `npm audit` + `lockfile-lint` en CI. Renovate/Dependabot semanal. Pinning de GitHub Actions a SHA |
| **A07** | Auth Failures | NO | Sin sistema de auth |
| **A08** | Data Integrity Failures | SÍ | `lockfile-lint` previene tampering del lock. Vercel build reproducible. Sin updates externos sin verificación |
| **A09** | Logging Failures | SÍ — **CRÍTICO** | Log eventos de seguridad (rate limit hit, honeypot trigger, Zod failures) **SIN** datos del usuario (no email, no message body). Solo `ip_hash`, timestamp, error code |
| **A10** | SSRF | NO | Sin endpoints que hagan fetch de URLs proporcionadas por el usuario |

### Recomendación CI/CD (para git-agent)
- **GitHub Actions pinning a SHA**: `uses: actions/checkout@8e8c4839... # v4.1.7`
- **CodeQL SAST**: agregar workflow `github/codeql-action/analyze@v3` para detección automática
- **lockfile-lint**: `npx lockfile-lint --allowed-hosts npm --allowed-schemes "https:" --type npm --path package-lock.json`

---

## 4. Validaciones críticas en `/api/contact`

### 4.1 Zod schema (server-side, fuente de verdad)

```ts
// src/lib/validation/contact.ts
import { z } from 'zod';

// Regex email RFC 5322 simplificada — rechaza CRLF (T5)
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Rechaza control chars (CRLF, NULL bytes, etc.)
const NO_CONTROL_CHARS = /^[^\x00-\x1F\x7F]*$/;

export const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Nombre muy corto')
    .max(80, 'Nombre muy largo')
    .regex(NO_CONTROL_CHARS, 'Caracteres inválidos'),

  email: z.string()
    .trim()
    .toLowerCase()
    .max(254, 'Email muy largo')        // RFC 5321 limit
    .regex(EMAIL_REGEX, 'Email inválido')
    .regex(NO_CONTROL_CHARS, 'Caracteres inválidos'),

  message: z.string()
    .trim()
    .min(10, 'Mensaje muy corto')
    .max(2000, 'Mensaje muy largo')
    .regex(NO_CONTROL_CHARS, 'Caracteres inválidos'),

  // Honeypot: debe estar vacío. Si llega con valor → bot
  website: z.string().max(0, 'Bot detectado').optional().default(''),

  // Timestamp del cliente para detectar submissions instantáneas (bots)
  // Mínimo 3 segundos entre render y submit
  formRenderedAt: z.number().int().positive(),
});

export type ContactInput = z.infer<typeof contactSchema>;
```

### 4.2 Route handler (`src/app/api/contact/route.ts`)

```ts
import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation/contact';
import { checkRateLimit } from '@/lib/security/rate-limit';
import { hashIp, hashUserAgent } from '@/lib/security/hashing';
import { db } from '@/lib/db';
import { messages } from '@/lib/db/schema';

// Forzar runtime Node (Drizzle requiere) — no edge
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const GENERIC_OK = NextResponse.json(
  { ok: true, message: 'Mensaje recibido' },
  { status: 200 }
);

const GENERIC_ERROR = NextResponse.json(
  { ok: false, message: 'No se pudo procesar la solicitud' },
  { status: 400 }
);

export async function POST(req: NextRequest) {
  try {
    // 1. Body size guard (defensa en profundidad ante bypass de bodySizeLimit)
    const contentLength = Number(req.headers.get('content-length') ?? '0');
    if (contentLength > 10_000) return GENERIC_ERROR;

    // 2. Extraer IP (Vercel) y hashear inmediatamente
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown';
    const ipHash = await hashIp(ip);

    // 3. Rate limit ANTES de parsear body (cheap path)
    const rl = await checkRateLimit(ipHash);
    if (!rl.allowed) {
      // Log evento de seguridad SIN datos del usuario
      console.warn('[security] rate_limit_exceeded', {
        ip_hash: ipHash.slice(0, 8), // solo prefix para correlation
        retry_after: rl.retryAfter,
      });
      return NextResponse.json(
        { ok: false, message: 'Demasiadas solicitudes. Intenta más tarde.' },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
      );
    }

    // 4. Parsear y validar
    const json = await req.json().catch(() => null);
    if (!json) return GENERIC_ERROR;

    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
      console.warn('[security] validation_failed', {
        ip_hash: ipHash.slice(0, 8),
        // NUNCA loguear el contenido — solo los issues
        issues: parsed.error.issues.map(i => i.path.join('.')),
      });
      return GENERIC_ERROR;
    }

    // 5. Honeypot check (Zod ya lo valida con max(0), redundancia OK)
    if (parsed.data.website.length > 0) {
      console.warn('[security] honeypot_triggered', { ip_hash: ipHash.slice(0, 8) });
      return GENERIC_OK; // Engañar al bot con éxito falso
    }

    // 6. Time-trap: rechazar submissions <3s
    const elapsedMs = Date.now() - parsed.data.formRenderedAt;
    if (elapsedMs < 3_000 || elapsedMs > 60 * 60 * 1000) {
      console.warn('[security] time_trap', { ip_hash: ipHash.slice(0, 8), elapsedMs });
      return GENERIC_OK; // Engañar al bot
    }

    // 7. Persistir vía Drizzle (parameterized — SAFE)
    const uaHash = await hashUserAgent(req.headers.get('user-agent') ?? '');
    await db.insert(messages).values({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
      ipHash,
      userAgentHash: uaHash,
      createdAt: new Date(),
    });

    return GENERIC_OK;
  } catch (err) {
    // NUNCA filtrar stack trace al cliente
    console.error('[contact] unexpected_error', {
      // Loguear error tipo, no message (puede tener PII)
      type: err instanceof Error ? err.constructor.name : 'unknown',
    });
    return NextResponse.json(
      { ok: false, message: 'Error interno' },
      { status: 500 }
    );
  }
}

// Bloquear todos los métodos no-POST explícitamente
export async function GET() {
  return new NextResponse('Method Not Allowed', { status: 405 });
}
```

### 4.3 Rate limit (in-memory con Map + TTL)

> **Nota**: En Vercel serverless, el `Map` no persiste entre invocaciones cold. Para producción real, migrar a tabla `rate_limits` en Postgres o usar Upstash Redis. Para portfolio de bajo tráfico, Map es aceptable como primera defensa.

```ts
// src/lib/security/rate-limit.ts
type Entry = { count: number; resetAt: number };
const buckets = new Map<string, Entry>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hora
const MAX_REQUESTS = 3;

export async function checkRateLimit(ipHash: string): Promise<{
  allowed: boolean;
  retryAfter: number;
}> {
  const now = Date.now();
  const entry = buckets.get(ipHash);

  if (!entry || entry.resetAt < now) {
    buckets.set(ipHash, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { allowed: true, retryAfter: 0 };
}

// Cleanup periódico — cada 100 lookups
let cleanupCounter = 0;
function maybeCleanup() {
  if (++cleanupCounter % 100 !== 0) return;
  const now = Date.now();
  for (const [k, v] of buckets) {
    if (v.resetAt < now) buckets.delete(k);
  }
}
```

### 4.4 IP hashing (SHA-256 + salt)

```ts
// src/lib/security/hashing.ts
import { createHash } from 'node:crypto';

const SALT = process.env.HASH_SALT ?? '';
if (!SALT || SALT.length < 32) {
  throw new Error('HASH_SALT debe ser >=32 chars (set en .env.local)');
}

export async function hashIp(ip: string): Promise<string> {
  return createHash('sha256').update(SALT + ip).digest('hex');
}

export async function hashUserAgent(ua: string): Promise<string> {
  return createHash('sha256').update(SALT + ua).digest('hex').slice(0, 16);
}
```

### 4.5 Honeypot field en frontend

```tsx
// src/components/ContactForm.tsx (fragmento crítico)
<div aria-hidden="true" style={{
  position: 'absolute',
  left: '-9999px',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  opacity: 0,
  pointerEvents: 'none',
}}>
  <label htmlFor="website">No completar este campo</label>
  <input
    type="text"
    id="website"
    name="website"
    tabIndex={-1}
    autoComplete="off"
  />
</div>

{/* Timestamp inicial para time-trap */}
<input type="hidden" name="formRenderedAt" value={renderedAt} />
```

---

## 5. Database Security (Drizzle + PostgreSQL)

### 5.1 Schema con campos sensibles hasheados

```ts
// src/lib/db/schema.ts
import { pgTable, serial, text, timestamp, varchar, index } from 'drizzle-orm/pg-core';

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 80 }).notNull(),
  email: varchar('email', { length: 254 }).notNull(),
  message: text('message').notNull(),
  // SHA-256 hex = 64 chars — NUNCA IP raw
  ipHash: varchar('ip_hash', { length: 64 }).notNull(),
  userAgentHash: varchar('user_agent_hash', { length: 16 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
  // Índice sobre ip_hash para futuras queries de rate-limit persistente
  ipHashIdx: index('messages_ip_hash_idx').on(table.ipHash, table.createdAt),
}));
```

### 5.2 Reglas de queries seguras

| Permitido | Prohibido |
|-----------|-----------|
| `db.insert(messages).values({...})` | `db.execute(sql\`INSERT INTO messages VALUES (${input})\`)` |
| `db.select().from(messages).where(eq(messages.email, input))` | `sql.raw(\`SELECT * FROM messages WHERE email = '${input}'\`)` |
| `sql\`SELECT * FROM ${messages} WHERE id = ${id}\`` (Drizzle interpola seguro) | String concatenation manual |

### 5.3 Connection string

```bash
# .env.local (NUNCA commitear)
DATABASE_URL="postgresql://user:pass@host:5432/dbname?sslmode=require"
HASH_SALT="<openssl rand -hex 32>"
```

- `sslmode=require` obligatorio — falla si no hay TLS
- Si Supabase: usar **Transaction Pooler** (puerto 6543) + `prepare: false` con `postgres-js`

### 5.4 Drizzle client

```ts
// src/lib/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL not set');

// Importante: NO exponer este client al cliente
const client = postgres(connectionString, {
  prepare: false,    // Compatibilidad con poolers
  max: 1,            // Serverless: una conexión por invocación
  ssl: 'require',
});

export const db = drizzle(client);
```

---

## 6. Environment Variables

### 6.1 Variables requeridas

| Variable | Tipo | Server-only | Notas |
|----------|------|-------------|-------|
| `DATABASE_URL` | Secret | SÍ (no `NEXT_PUBLIC_`) | Connection string Postgres con `sslmode=require` |
| `HASH_SALT` | Secret | SÍ | Mínimo 32 chars random. **Nunca rotar** sin migración (rompería rate limit histórico) |
| `NODE_ENV` | Public | Auto | `production` en Vercel |

**Regla absoluta**: ninguna variable con prefijo `NEXT_PUBLIC_` para este proyecto. No hay nada que el cliente necesite saber del backend.

### 6.2 `.gitignore` mínimo

```
.env
.env.local
.env.*.local
.env.production
*.pem
*.key
.vercel
node_modules
.next
out
coverage
```

### 6.3 Generar `HASH_SALT`

```bash
openssl rand -hex 32
# Output: 64 chars hex — copiar a Vercel Environment Variables
```

### 6.4 Vercel deployment

- Settings → Environment Variables → agregar `DATABASE_URL` y `HASH_SALT` con scope **Production + Preview** (NO Development si dev usa `.env.local`)
- Marcar como "Sensitive" para que no aparezcan en logs de build

---

## 7. Anti-patterns a evitar

### 7.1 Logging
- **NO** loguear `req.body` completo en producción
- **NO** loguear `email`, `message`, `name` (PII)
- **NO** loguear stack traces a stdout/stderr en respuestas HTTP — solo en server logs
- **SÍ** loguear: `ip_hash` (prefix 8 chars), event_type, timestamp, error class name

### 7.2 Respuestas HTTP
- **NO** devolver `error.message` raw del servidor al cliente
- **NO** devolver detalles de Zod issues con valores del usuario
- **NO** diferenciar "email ya existe" de "email inválido" (en este proyecto no aplica, pero principio general)
- **SÍ** respuestas genéricas: `{ ok: true/false, message: "..." }`

### 7.3 CORS
- **NO** `Access-Control-Allow-Origin: *`
- **NO** necesario configurar CORS — el formulario hace fetch same-origin
- Si en algún momento se agrega API consumida por terceros: whitelist explícita de orígenes

### 7.4 Frontend
- Todos los `<a target="_blank">` deben tener `rel="noopener noreferrer"` (T8 — tab-nabbing)
- No usar `dangerouslySetInnerHTML` con contenido del usuario
- Si se renderiza contenido del CMS/markdown: sanitizar con allowlist (DOMPurify o similar)

### 7.5 Build
- `productionBrowserSourceMaps: false` en `next.config.ts` (T11)
- Verificar post-deploy: `curl -I https://tanitocode.com/_next/static/chunks/main-*.js.map` debe devolver 404
- `poweredByHeader: false`

### 7.6 Dependencies
- Run `npm audit --production` antes de cada deploy
- `lockfile-lint` en CI:
  ```bash
  npx lockfile-lint --allowed-hosts npm --allowed-schemes "https:" --type npm --path package-lock.json
  ```
- Renovate/Dependabot config para updates semanales

---

## 8. Checklist de verificación pre-deploy

- [ ] `vercel.json` con todos los headers de sección 2
- [ ] `next.config.ts` con `productionBrowserSourceMaps: false` + `poweredByHeader: false`
- [ ] `.env.local` en `.gitignore` y NO commiteado
- [ ] `HASH_SALT` generado y configurado en Vercel (>=32 chars)
- [ ] `DATABASE_URL` con `sslmode=require`
- [ ] Schema `messages` con `ip_hash` (NO columna `ip` raw)
- [ ] `/api/contact` devuelve 405 a métodos no-POST
- [ ] Honeypot field renderizado y oculto correctamente (no `display:none` — usar técnica de off-screen)
- [ ] Rate limit testado: 4ta request en <1h devuelve 429
- [ ] Zod schema rechaza: payload >10KB, control chars, email inválido, message <10 chars
- [ ] Logs NO contienen email/message/name (revisar con `vercel logs`)
- [ ] Response 500 NO contiene stack trace
- [ ] `npm audit --production` sin HIGH/CRITICAL
- [ ] `lockfile-lint` PASS
- [ ] Source maps NO accesibles en producción (`curl` 404)
- [ ] HSTS preload submitted a https://hstspreload.org/ (opcional, solo si tanitocode.com es dominio dedicado)
- [ ] Todos los `target="_blank"` con `rel="noopener noreferrer"`
- [ ] CSP testada con https://csp-evaluator.withgoogle.com/

---

## 9. Top 5 reglas críticas (hard rules)

1. **Drizzle parameterized queries siempre** — prohibido `sql.raw()` con user input. Cualquier raw query en code review → BLOQUEADOR.
2. **IP hasheada antes de tocar DB** — no existe columna `ip` raw en ningún schema. SHA-256 + salt obligatorio.
3. **Headers de seguridad en `vercel.json`** — sin CSP, HSTS, X-Frame-Options, X-Content-Type-Options el deploy no certifica.
4. **Logs sin PII** — email/message/name nunca aparecen en logs. Solo `ip_hash` (prefix), event_type, error class.
5. **Rate limit + honeypot + time-trap los tres juntos** en `/api/contact`. Eliminar cualquiera deja la API expuesta a flood.
