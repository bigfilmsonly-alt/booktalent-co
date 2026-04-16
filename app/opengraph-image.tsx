import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'BookTalent — Book Reality TV Stars for Brand Campaigns'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0A',
          position: 'relative',
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            background:
              'radial-gradient(ellipse at center, rgba(232,185,49,0.08) 0%, transparent 65%)',
          }}
        />

        {/* Top gold accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, transparent 10%, #E8B931 50%, transparent 90%)',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 80px',
          }}
        >
          {/* Logo text */}
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.35em',
              color: '#E8B931',
              fontWeight: 700,
              marginBottom: 40,
              display: 'flex',
            }}
          >
            BOOKTALENT
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#F5F4F0',
              lineHeight: 1.1,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span>Premium talent.</span>
            <span style={{ display: 'flex' }}>
              Proven on{' '}
              <span style={{ color: '#E8B931', marginLeft: 16 }}>television.</span>
            </span>
          </div>

          {/* Sub text */}
          <div
            style={{
              fontSize: 22,
              color: '#A8A8A8',
              marginTop: 32,
              textAlign: 'center',
              lineHeight: 1.5,
              maxWidth: 700,
              display: 'flex',
            }}
          >
            Vetted creators from MTV, Food Network, NBC and more.
          </div>

          {/* CTA pill */}
          <div
            style={{
              marginTop: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#E8B931',
              color: '#0A0A0A',
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '0.2em',
              padding: '16px 48px',
            }}
          >
            BOOK TALENT
          </div>
        </div>

        {/* Bottom network bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: '1px solid rgba(42,42,42,0.6)',
            padding: '18px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 60,
          }}
        >
          {['MTV', 'FOOD NETWORK', 'NBC', 'HALLMARK', 'USA NETWORK', 'OWN', 'CBS'].map(
            (network) => (
              <span
                key={network}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'rgba(245,244,240,0.35)',
                  letterSpacing: '0.3em',
                }}
              >
                {network}
              </span>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  )
}
