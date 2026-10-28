import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
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

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="service-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        // Clicks on the ::backdrop target the <dialog> itself
        if (event.target === event.currentTarget) close()
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2.5rem)] max-w-[560px] overflow-y-auto rounded-[28px] bg-paper p-0 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,.35)] backdrop:bg-black/40 backdrop:backdrop-blur-sm"
    >
      {service && (
        <div className="relative p-8 sm:p-10">
          <button
            type="button"
            aria-label={t.a11y.closeDialog}
            className="focus-ring absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/[.05] text-ink transition-colors hover:bg-black/10"
            onClick={close}
          >
            <X size={18} aria-hidden="true" />
          </button>
          <p className="section-eyebrow pr-12">{t.modalTitle}</p>
          <h2 id="service-dialog-title" className="mt-3 pr-12 text-title font-semibold text-ink">{service.title}</h2>
          <p className="mt-4 text-para text-body">{service.detail}</p>
          <button type="button" className="focus-ring btn btn-secondary mt-8" onClick={close}>
            {t.modalButton}
          </button>
        </div>
      )}
    </dialog>
  )
}
