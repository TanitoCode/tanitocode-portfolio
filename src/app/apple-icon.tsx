import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0A',
          borderRadius: 40,
        }}
      >
        <div
          style={{
            color: '#2563EB',
            fontSize: 100,
            fontWeight: 700,
            fontFamily: 'monospace',
            letterSpacing: '-0.05em',
          }}
        >
          T
        </div>
      </div>
    ),
    { ...size }
  )
}
