import { getAllPosts } from '@/lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — TanitoCode',
  description: 'Artículos sobre desarrollo web, React, Next.js y más.',
}

function formatDate(raw: string): string {
  const date = new Date(raw)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <section
      aria-labelledby="blog-heading"
      style={{
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="container">
        <h1 id="blog-heading" className="blog-heading">
          Blog
        </h1>

        {posts.length === 0 ? (
          <p className="blog-empty">No hay posts publicados todavía.</p>
        ) : (
          <ul className="blog-list" role="list">
            {posts.map((post) => (
              <li key={post.slug}>
                <a href={`/blog/${post.slug}`} className="blog-card">
                  <div className="blog-card-meta">
                    <span className="blog-category">{post.category}</span>
                    <time dateTime={post.date} className="blog-date">
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <h2 className="blog-title">{post.title}</h2>
                  <p className="blog-summary">{post.summary}</p>
                  <span className="blog-read-more" aria-hidden="true">
                    Leer más →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        /* ── Heading ─────────────────────────────────── */
        .blog-heading {
          font-family: var(--font-sans);
          font-size: var(--text-h2);
          font-weight: var(--font-weight-bold);
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-tight);
          color: var(--color-fg);
          margin: 0 0 var(--space-12) 0;
        }

        /* ── Empty state ─────────────────────────────── */
        .blog-empty {
          font-family: var(--font-sans);
          font-size: var(--text-body-lg);
          color: var(--color-fg-muted);
          margin: 0;
        }

        /* ── List ────────────────────────────────────── */
        .blog-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .blog-list > li {
          border-bottom: 1px solid var(--color-border);
        }

        .blog-list > li:first-child {
          border-top: 1px solid var(--color-border);
        }

        /* ── Card (link) ─────────────────────────────── */
        .blog-card {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          padding: var(--space-8) 0;
          text-decoration: none;
          transition: none;
        }

        .blog-card:hover .blog-title {
          color: var(--color-accent);
        }

        .blog-card:hover .blog-read-more {
          color: var(--color-accent-hover);
        }

        /* ── Meta row ────────────────────────────────── */
        .blog-card-meta {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        /* ── Category badge ──────────────────────────── */
        .blog-category {
          display: inline-flex;
          align-items: center;
          padding: var(--space-1) var(--space-3);
          font-family: var(--font-sans);
          font-size: var(--text-xs);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          color: var(--color-accent);
          background-color: var(--color-accent-muted);
          border-radius: var(--radius-badge);
          line-height: 1.4;
        }

        /* ── Date ────────────────────────────────────── */
        .blog-date {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--color-fg-subtle);
        }

        /* ── Post title ──────────────────────────────── */
        .blog-title {
          font-family: var(--font-sans);
          font-size: var(--text-h3);
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-snug);
          color: var(--color-fg);
          margin: 0;
          transition: color var(--duration-fast) var(--ease-in-out);
        }

        /* ── Summary ─────────────────────────────────── */
        .blog-summary {
          font-family: var(--font-sans);
          font-size: var(--text-body);
          line-height: var(--leading-relaxed);
          color: var(--color-fg-muted);
          margin: 0;
          max-width: 70ch;
        }

        /* ── Read more ───────────────────────────────── */
        .blog-read-more {
          font-family: var(--font-sans);
          font-size: var(--text-small);
          font-weight: var(--font-weight-medium);
          color: var(--color-accent);
          transition: color var(--duration-fast) var(--ease-in-out);
        }
      `}</style>
    </section>
  )
}
