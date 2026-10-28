import { useEffect, useRef, useState } from 'react'
import { site } from '../config/site.ts'
import { useLocale } from '../i18n/useLocale.ts'

// Owner decision 2026-10-27: show the 2D road map directly (no click-to-load).
// Google Maps is only requested once the panel nears the viewport (Chrome's own
// iframe lazy-loading threshold is too generous on desktop to defer it).
// The plain Maps link next to it always works, even if the iframe is blocked.
export function MapEmbed() {
  const { t, locale } = useLocale()
  const panelRef = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    observer.observe(panel)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={panelRef} className="h-[360px] overflow-hidden rounded-[28px] bg-sage md:h-[420px] lg:h-[480px]">
      <iframe
        title={t.map.iframeTitle}
        src={near ? site.mapEmbedUrl(locale) : undefined}
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="h-full w-full border-0"
      />
    </div>
  )
}
