export function MetricCard({
  label,
  value,
  detail,
  accent = "field"
}: {
  label: string;
  value: string;
  detail?: string;
  accent?: "field" | "signal" | "warning" | "ink";
}) {
  const accents = {
    field: "from-brand-blue to-signal",
    signal: "from-signal to-brand-blue",
    warning: "from-amber-500 to-orange-600",
    ink: "from-brand-red to-red-700"
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-sm">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accents[accent]}`} />
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">{value}</p>
      {detail ? <p className="mt-2 text-sm leading-5 text-muted-foreground">{detail}</p> : null}
    </section>
  );
}
