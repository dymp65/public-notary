import { useLocale } from '../i18n/useLocale.ts'
import type { Design } from '../types/site.ts'

const designs: readonly Design[] = ['v1', 'v2', 'v3']

interface DesignSwitchProps {
  design: Design
  onChange: (design: Design) => void
}

// Review-only control (flags.showDesignSwitch, O-13): floats over both designs, below the header.
export function DesignSwitch({ design, onChange }: DesignSwitchProps) {
  const { t } = useLocale()
  return (
    <div
      role="group"
      aria-labelledby="design-switch-label"
      className="fixed bottom-4 left-4 z-40 flex items-center gap-1 rounded-full border border-black/10 bg-paper/90 p-1 text-small shadow-lg shadow-black/10 backdrop-blur-xl"
    >
      <span id="design-switch-label" className="pr-1 pl-3 text-muted">{t.designSwitch.label}</span>
      {designs.map((id) => (
        <button
          key={id}
          type="button"
          aria-pressed={design === id}
          onClick={() => onChange(id)}
          className={`focus-ring min-h-10 rounded-full px-4 font-medium transition-colors ${
            design === id ? 'bg-forest text-white' : 'text-body hover:bg-sage'
          }`}
        >
          {t.designSwitch[id]}
        </button>
      ))}
    </div>
  )
}
