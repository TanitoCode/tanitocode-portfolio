'use client'

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

interface FormData {
  nombre: string
  email: string
  mensaje: string
  website: string
}

const emptyForm: FormData = { nombre: '', email: '', mensaje: '', website: '' }

function validateForm(data: FormData): Partial<Record<keyof FormData, string>> {
  const errors: Partial<Record<keyof FormData, string>> = {}
  if (!data.nombre.trim()) errors.nombre = 'El nombre es requerido.'
  if (!data.email.trim()) {
    errors.email = 'El email es requerido.'
  } else if (!data.email.includes('@')) {
    errors.email = 'Ingresá un email válido.'
  }
  if (!data.mensaje.trim()) errors.mensaje = 'El mensaje es requerido.'
  return errors
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [status, setStatus] = useState<FormState>('idle')
  const [serverError, setServerError] = useState<string>('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear field error on change
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const validationErrors = validateForm(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('loading')
    setServerError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm(emptyForm)
        setErrors({})
      } else {
        const data = await res.json().catch(() => ({})) as { error?: string }
        setServerError(data.error ?? 'Ocurrió un error al enviar el mensaje.')
        setStatus('error')
      }
    } catch {
      setServerError('No se pudo conectar con el servidor. Intentá de nuevo.')
      setStatus('error')
    }
  }

  return (
    <section
      aria-labelledby="contact-heading"
      style={{
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="container">
        <div className="contact-layout">
          <div className="contact-intro">
            <h1 id="contact-heading" className="contact-heading">
              Contacto
            </h1>
            <p className="contact-sub">
              Tenés un proyecto en mente o querés charlar? Mandame un mensaje y te respondo a la brevedad.
            </p>

            {/* Social links */}
            <ul className="contact-links" role="list">
              <li>
                <a href="https://github.com/TanitoCode" target="_blank" rel="noopener noreferrer" className="contact-social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  <span>github.com/TanitoCode</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/mario-cristian-sanchez/" target="_blank" rel="noopener noreferrer" className="contact-social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                  </svg>
                  <span>mario-cristian-sanchez</span>
                </a>
              </li>
              <li>
                <a href="mailto:mariocrsanchez@gmail.com" className="contact-social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>mariocrsanchez@gmail.com</span>
                </a>
              </li>
            </ul>

            {/* CV download */}
            <a href="/cv-tanitocode.pdf" download className="contact-cv-btn">
              Descargar CV
            </a>
          </div>

          <form
            onSubmit={handleSubmit}
            className="contact-form"
            noValidate
            aria-label="Formulario de contacto"
          >
            {/* Honeypot — invisible to humans, catches bots */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={handleChange}
              />
            </div>
            {/* Nombre */}
            <div className="field">
              <label htmlFor="nombre" className="field-label">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                autoComplete="name"
                className="field-input"
                value={form.nombre}
                onChange={handleChange}
                aria-describedby={errors.nombre ? 'error-nombre' : undefined}
                aria-invalid={!!errors.nombre}
                disabled={status === 'loading'}
                placeholder="Tu nombre"
              />
              {errors.nombre && (
                <span id="error-nombre" className="field-error" role="alert">
                  {errors.nombre}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="field">
              <label htmlFor="email" className="field-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="field-input"
                value={form.email}
                onChange={handleChange}
                aria-describedby={errors.email ? 'error-email' : undefined}
                aria-invalid={!!errors.email}
                disabled={status === 'loading'}
                placeholder="tu@email.com"
              />
              {errors.email && (
                <span id="error-email" className="field-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Mensaje */}
            <div className="field">
              <label htmlFor="mensaje" className="field-label">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={6}
                className="field-input field-textarea"
                value={form.mensaje}
                onChange={handleChange}
                aria-describedby={errors.mensaje ? 'error-mensaje' : undefined}
                aria-invalid={!!errors.mensaje}
                disabled={status === 'loading'}
                placeholder="Contame en qué puedo ayudarte..."
              />
              {errors.mensaje && (
                <span id="error-mensaje" className="field-error" role="alert">
                  {errors.mensaje}
                </span>
              )}
            </div>

            {/* Server error */}
            {status === 'error' && serverError && (
              <div className="form-server-error" role="alert">
                {serverError}
              </div>
            )}

            {/* Success message */}
            {status === 'success' && (
              <div className="form-success" role="status">
                ¡Mensaje enviado! Te respondo pronto.
              </div>
            )}

            <button
              type="submit"
              className="contact-submit"
              disabled={status === 'loading' || status === 'success'}
              aria-busy={status === 'loading'}
            >
              {status === 'loading' ? 'Enviando…' : 'Enviar mensaje'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        /* ── Layout ──────────────────────────────────── */
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
          max-width: 720px;
        }

        @media (min-width: 768px) {
          .contact-layout {
            grid-template-columns: 2fr 3fr;
            align-items: start;
            gap: var(--space-16);
            max-width: 100%;
          }
        }

        /* ── Intro column ────────────────────────────── */
        .contact-intro {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        /* ── Heading ─────────────────────────────────── */
        .contact-heading {
          font-family: var(--font-sans);
          font-size: var(--text-h2);
          font-weight: var(--font-weight-bold);
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-tight);
          color: var(--color-fg);
          margin: 0;
        }

        .contact-sub {
          font-family: var(--font-sans);
          font-size: var(--text-body-lg);
          line-height: var(--leading-relaxed);
          color: var(--color-fg-muted);
          margin: 0;
        }

        /* ── Social links ────────────────────────��───── */
        .contact-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .contact-social-link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-3);
          color: var(--color-fg-muted);
          text-decoration: none;
          font-family: var(--font-sans);
          font-size: var(--text-small);
          transition: color var(--duration-fast) var(--ease-in-out);
        }

        .contact-social-link:hover {
          color: var(--color-accent);
        }

        /* ── CV button ───────────────────────────────── */
        .contact-cv-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-4);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-btn);
          color: var(--color-fg-muted);
          font-family: var(--font-sans);
          font-size: var(--text-small);
          font-weight: var(--font-weight-medium);
          text-decoration: none;
          transition:
            color var(--duration-fast) var(--ease-in-out),
            border-color var(--duration-fast) var(--ease-in-out);
        }

        .contact-cv-btn:hover {
          color: var(--color-accent);
          border-color: var(--color-accent);
        }

        /* ── Form ────────────────────────────────────── */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        /* ── Field wrapper ───────────────────────────── */
        .field {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        /* ── Label ───────────────────────────────────── */
        .field-label {
          font-family: var(--font-sans);
          font-size: var(--text-small);
          font-weight: var(--font-weight-medium);
          color: var(--color-fg);
        }

        /* ── Input / Textarea ────────────────────────── */
        .field-input {
          width: 100%;
          font-family: var(--font-sans);
          font-size: 1rem; /* 16px minimum — prevents iOS Safari autozoom */
          line-height: var(--leading-normal);
          color: var(--color-fg);
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-input);
          padding: var(--space-3) var(--space-4);
          transition:
            border-color var(--duration-fast) var(--ease-in-out),
            box-shadow var(--duration-fast) var(--ease-in-out);
          outline: none;
          appearance: none;
          -webkit-appearance: none;
        }

        .field-input::placeholder {
          color: var(--color-fg-subtle);
        }

        .field-input:focus {
          border-color: var(--color-border-focus);
          box-shadow: 0 0 0 3px var(--color-accent-muted);
        }

        .field-input[aria-invalid="true"] {
          border-color: var(--color-error);
        }

        .field-input[aria-invalid="true"]:focus {
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);
        }

        .field-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .field-textarea {
          resize: vertical;
          min-height: 120px;
        }

        /* ── Field error ─────────────────────────────── */
        .field-error {
          font-family: var(--font-sans);
          font-size: var(--text-xs);
          color: var(--color-error);
        }

        /* ── Server error ────────────────────────────── */
        .form-server-error {
          padding: var(--space-3) var(--space-4);
          background-color: rgba(220, 38, 38, 0.08);
          border: 1px solid rgba(220, 38, 38, 0.25);
          border-radius: var(--radius-md);
          font-family: var(--font-sans);
          font-size: var(--text-small);
          color: var(--color-error);
        }

        /* ── Success message ─────────────────────────── */
        .form-success {
          padding: var(--space-3) var(--space-4);
          background-color: rgba(22, 163, 74, 0.08);
          border: 1px solid rgba(22, 163, 74, 0.25);
          border-radius: var(--radius-md);
          font-family: var(--font-sans);
          font-size: var(--text-small);
          color: var(--color-success);
        }

        /* ── Submit button ───────────────────────────── */
        .contact-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          align-self: flex-start;
          padding: var(--space-3) var(--space-8);
          background-color: var(--color-accent);
          color: var(--color-on-accent);
          font-family: var(--font-sans);
          font-size: var(--text-body);
          font-weight: var(--font-weight-semibold);
          border: 1px solid transparent;
          border-radius: var(--radius-btn);
          cursor: pointer;
          transition:
            background-color var(--duration-fast) var(--ease-in-out),
            transform var(--duration-fast) var(--ease-out);
          white-space: nowrap;
        }

        .contact-submit:hover:not(:disabled) {
          background-color: var(--color-accent-hover);
        }

        .contact-submit:active:not(:disabled) {
          transform: scale(0.98);
        }

        .contact-submit:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  )
}
