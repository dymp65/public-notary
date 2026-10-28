interface SectionHeaderProps {
  eyebrow: string
  title: string
  titleId?: string
  desc?: string
  centered?: boolean
  // Smaller desktop title for the narrow columns of the hybrid About and Office rows
  compact?: boolean
}

export function SectionHeader({ eyebrow, title, titleId, desc, centered = false, compact = false }: SectionHeaderProps) {
  return (
    <div className={centered ? 'mx-auto max-w-[720px] text-center' : 'max-w-[660px]'}>
      <p className="section-eyebrow mb-5">{eyebrow}</p>
      <h2
        id={titleId}
        className={`font-display text-[33px] leading-[1.18] tracking-[-.035em] text-ink sm:text-[43px] ${compact ? 'lg:text-[38px]' : 'lg:text-[52px]'}`}
      >
        {title}
      </h2>
      {desc && <p className="mt-5 text-[15px] leading-[1.9] text-body">{desc}</p>}
    </div>
  )
}
