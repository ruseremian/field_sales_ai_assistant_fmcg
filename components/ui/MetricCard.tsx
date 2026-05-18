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
    field: "from-emerald-500 to-teal-600",
    signal: "from-blue-500 to-indigo-600",
    warning: "from-amber-500 to-orange-600",
    ink: "from-slate-700 to-slate-950"
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/70">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accents[accent]}`} />
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">{value}</p>
      {detail ? <p className="mt-2 text-sm leading-5 text-slate-500">{detail}</p> : null}
    </section>
  );
}
