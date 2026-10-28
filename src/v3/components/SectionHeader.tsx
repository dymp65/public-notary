interface SectionHeaderProps {
  eyebrow: string
  title: string
  titleId?: string
  desc?: string
  centered?: boolean
}

export function SectionHeader({ eyebrow, title, titleId, desc, centered = false }: SectionHeaderProps) {
  return (
    <div className={centered ? 'mx-auto max-w-[760px] text-center' : 'max-w-[720px]'}>
      <p className="text-ui font-medium text-white/60">{eyebrow}</p>
      <h2 id={titleId} className="mt-3 text-balance text-h2-sm font-semibold text-white lg:text-h2">
        {title}
      </h2>
      {desc && <p className="mt-5 text-lead text-white/75">{desc}</p>}
    </div>
  )
}
