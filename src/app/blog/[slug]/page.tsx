import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const { meta } = getPostBySlug(slug)
    return {
      title: meta.title,
      description: meta.summary,
      openGraph: {
        title: meta.title,
        description: meta.summary,
        type: 'article',
        url: `https://tanitocode.dev/blog/${slug}`,
        publishedTime: meta.date,
        authors: ['Mario Cristian Sanchez'],
      },
      twitter: {
        card: 'summary',
        title: meta.title,
        description: meta.summary,
      },
      alternates: {
        canonical: `https://tanitocode.dev/blog/${slug}`,
      },
    }
  } catch {
    return {}
  }
}

function formatDate(raw: string): string {
  const date = new Date(raw)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params

  let meta: { title: string; date: string; category: string; summary: string }
  let content: string

  try {
    const result = getPostBySlug(slug)
    meta = result.meta
    content = result.content
  } catch {
    notFound()
  }

  return (
    <article
      aria-labelledby="post-title"
      style={{
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="container">
        <div className="post-layout">
          {/* Post header */}
          <header className="post-header">
            <div className="post-meta">
              <span className="post-category">{meta.category}</span>
              <time dateTime={meta.date} className="post-date">
                {formatDate(meta.date)}
              </time>
            </div>
            <h1 id="post-title" className="post-title">
              {meta.title}
            </h1>
            <p className="post-summary">{meta.summary}</p>
          </header>

          {/* Divider */}
          <hr className="post-divider" aria-hidden="true" />

          {/* MDX content */}
          <div className="post-body">
            <MDXRemote source={content} />
          </div>

          {/* Back link */}
          <div className="post-back">
            <Link href="/blog" className="post-back-link">
              ← Volver al blog
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Layout ──────────────────────────────────── */
        .post-layout {
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
          max-width: 720px;
        }

        /* ── Header ──────────────────────────────────── */
        .post-header {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        /* ── Meta row ────────────────────────────────── */
        .post-meta {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        /* ── Category badge ──────────────────────────── */
        .post-category {
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
        .post-date {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--color-fg-subtle);
        }

        /* ── Post title ──────────────────────────────── */
        .post-title {
          font-family: var(--font-sans);
          font-size: var(--text-h1);
          font-weight: var(--font-weight-bold);
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-tight);
          color: var(--color-fg);
          margin: 0;
        }

        /* ── Summary ─────────────────────────────────── */
        .post-summary {
          font-family: var(--font-sans);
          font-size: var(--text-body-lg);
          line-height: var(--leading-relaxed);
          color: var(--color-fg-muted);
          margin: 0;
        }

        /* ── Divider ─────────────────────────────────── */
        .post-divider {
          border: none;
          border-top: 1px solid var(--color-border);
          margin: 0;
        }

        /* ── MDX body ────────────────────────────────── */
        .post-body {
          font-family: var(--font-sans);
          font-size: var(--text-body-lg);
          line-height: var(--leading-relaxed);
          color: var(--color-fg);
        }

        .post-body h1,
        .post-body h2,
        .post-body h3,
        .post-body h4,
        .post-body h5,
        .post-body h6 {
          font-family: var(--font-sans);
          font-weight: var(--font-weight-bold);
          letter-spacing: var(--tracking-heading);
          line-height: var(--leading-tight);
          color: var(--color-fg);
          margin: var(--space-8) 0 var(--space-4) 0;
        }

        .post-body h1 { font-size: var(--text-h1); }
        .post-body h2 { font-size: var(--text-h2); }
        .post-body h3 { font-size: var(--text-h3); }

        .post-body p {
          margin: 0 0 var(--space-4) 0;
        }

        .post-body a {
          color: var(--color-accent);
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color var(--duration-fast) var(--ease-in-out);
        }

        .post-body a:hover {
          color: var(--color-accent-hover);
        }

        .post-body ul,
        .post-body ol {
          margin: 0 0 var(--space-4) 0;
          padding-left: var(--space-6);
        }

        .post-body li {
          margin-bottom: var(--space-1);
        }

        .post-body code {
          font-family: var(--font-mono);
          font-size: 0.875em;
          background-color: var(--color-code-bg);
          border-radius: var(--radius-sm);
          padding: 0.1em 0.35em;
        }

        .post-body pre {
          background-color: var(--color-code-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: var(--space-6);
          overflow-x: auto;
          margin: 0 0 var(--space-6) 0;
          line-height: var(--leading-code);
        }

        .post-body pre code {
          background: none;
          padding: 0;
          font-size: var(--text-small);
          border-radius: 0;
        }

        .post-body blockquote {
          border-left: 3px solid var(--color-accent);
          padding: var(--space-2) var(--space-6);
          margin: 0 0 var(--space-4) 0;
          color: var(--color-fg-muted);
          font-style: italic;
        }

        .post-body hr {
          border: none;
          border-top: 1px solid var(--color-border);
          margin: var(--space-8) 0;
        }

        .post-body img {
          max-width: 100%;
          height: auto;
          border-radius: var(--radius-md);
        }

        /* ── Back link ───────────────────────────────── */
        .post-back {
          padding-top: var(--space-8);
          border-top: 1px solid var(--color-border);
        }

        .post-back-link {
          font-family: var(--font-sans);
          font-size: var(--text-small);
          font-weight: var(--font-weight-medium);
          color: var(--color-fg-muted);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-in-out);
        }

        .post-back-link:hover {
          color: var(--color-accent);
        }
      `}</style>
    </article>
  )
}
