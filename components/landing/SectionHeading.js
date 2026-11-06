import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left';

  return (
    <div className={`max-w-2xl ${alignment}`}>
      <Reveal>
        <p className="font-mono text-[11px] tracking-[0.32em] text-amber-500/80 uppercase">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-4 font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={160}>
          <p className="mt-5 text-base leading-relaxed text-slate-400">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
