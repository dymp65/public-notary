import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useLocale } from '../../i18n/useLocale.ts'
import type { ServiceId } from '../../types/site.ts'

// Same behaviour as v2 (G-01, G-02: native modal <dialog>), on a dark panel
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
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2.5rem)] max-w-[560px] overflow-y-auto rounded-[28px] border border-white/15 bg-night-raised p-0 text-white backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      {service && (
        <div className="relative p-8 sm:p-10">
          <button
            type="button"
            aria-label={t.a11y.closeDialog}
            className="focus-ring absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/[.06] text-white transition-colors hover:bg-white/15"
            onClick={close}
          >
            <X size={18} aria-hidden="true" />
          </button>
          <p className="pr-12 text-ui font-medium text-white/60">{t.modalTitle}</p>
          <h2 id="service-dialog-title" className="mt-3 pr-12 text-title font-semibold">{service.title}</h2>
          <p className="mt-4 text-para text-white/75">{service.detail}</p>
          <button type="button" className="focus-ring btn-glass mt-8" onClick={close}>
            {t.modalButton}
          </button>
        </div>
      )}
    </dialog>
  )
}
