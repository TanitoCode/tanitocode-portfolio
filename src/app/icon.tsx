import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1E40FF',
          borderRadius: 6,
        }}
      >
        <div
          style={{
            color: '#ffffff',
            fontSize: 20,
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
