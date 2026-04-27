import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'TanitoCode — Desarrollador Fullstack'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#0A0A0A',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 80,
            width: 80,
            height: 4,
            background: '#2563EB',
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: '#F5F5F5',
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          TanitoCode
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            color: '#A0A0A0',
            letterSpacing: '-0.01em',
            marginBottom: 48,
          }}
        >
          Desarrolladora{' '}
          <span style={{ color: '#2563EB' }}>Fullstack</span>
        </div>

        {/* Stack pills */}
        <div style={{ display: 'flex', gap: 12 }}>
          {['React', 'Next.js', 'TypeScript', 'Node.js'].map((tech) => (
            <div
              key={tech}
              style={{
                padding: '8px 16px',
                border: '1px solid #1F1F1F',
                borderRadius: 4,
                color: '#666666',
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            right: 80,
            fontSize: 18,
            color: '#666666',
            fontFamily: 'monospace',
          }}
        >
          tanitocode.dev
        </div>
      </div>
    ),
    { ...size }
  )
}
