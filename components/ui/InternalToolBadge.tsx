export function InternalToolBadge({ label = "Internal Sales Tool" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-white px-3 py-1 text-xs font-semibold text-brand-blue shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
      {label}
    </span>
  );
}
