export function SectionCard({
  title,
  eyebrow,
  action,
  children,
  className = ""
}: {
  title?: string;
  eyebrow?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-border bg-white p-5 shadow-sm ${className}`}>
      {(title || eyebrow || action) ? (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{eyebrow}</p> : null}
            {title ? <h2 className="mt-1 text-lg font-semibold text-ink">{title}</h2> : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}
