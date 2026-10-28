import { Check, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { site } from '../config/site.ts'
import { useLocale } from '../i18n/useLocale.ts'
import type { ServiceId } from '../types/site.ts'

// G-01, G-02: native modal <dialog> (inert background, contained focus, Escape),
// text read by ID so a locale switch updates it in place.
export function ServiceDialog({ serviceId, onClose }: { serviceId: ServiceId | null; onClose: () => void }) {
  const { t } = useLocale()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (serviceId && !dialog.open) dialog.showModal()
    if (!serviceId && dialog.open) dialog.close()
  }, [serviceId])

  const close = () => dialogRef.current?.close()
  const service = serviceId ? t.services[serviceId] : null
  const image = serviceId ? site.images[site.serviceImages[serviceId]] : null

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="service-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        // Clicks on the ::backdrop target the <dialog> itself
        if (event.target === event.currentTarget) close()
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2.5rem)] max-w-[560px] overflow-y-auto rounded-2xl bg-paper p-0 text-ink shadow-2xl backdrop:bg-[#14271f]/65"
    >
      {service && image && (
        <div className="relative">
          <button
            type="button"
            aria-label={t.a11y.closeDialog}
            className="focus-ring absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/95"
            onClick={close}
          >
            <X size={18} aria-hidden="true" />
          </button>
          <img
            src={image.src}
            width={image.width}
            height={image.height}
            alt=""
            decoding="async"
            style={{ objectPosition: image.position }}
            className="h-[225px] w-full object-cover photo-tint"
          />
          <div className="px-8 py-8">
            <p className="section-eyebrow">{t.modalTitle}</p>
            <h2 id="service-dialog-title" className="mt-3 font-display text-[33px]">{service.title}</h2>
            <p className="mt-5 text-[14px] leading-[1.95] text-body">{service.detail}</p>
            <button
              type="button"
              className="focus-ring mt-7 flex items-center gap-2 rounded-full border border-[#d0d9cf] px-5 py-3 text-[12px] font-bold text-forest"
              onClick={close}
            >
              <Check size={15} aria-hidden="true" />
              {t.modalButton}
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
