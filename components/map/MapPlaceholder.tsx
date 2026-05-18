import { Map } from "lucide-react";

export function MapPlaceholder() {
  return (
    <section className="relative flex min-h-[360px] overflow-hidden rounded-3xl border border-border bg-blue-soft p-6 text-center shadow-sm">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,75,147,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(0,75,147,0.09)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="absolute left-[18%] top-[28%] h-3 w-3 rounded-full bg-brand-red ring-4 ring-white" />
      <div className="absolute left-[38%] top-[48%] h-3 w-3 rounded-full bg-brand-blue ring-4 ring-white" />
      <div className="absolute left-[68%] top-[35%] h-3 w-3 rounded-full bg-brand-blue ring-4 ring-white" />
      <div className="absolute left-[19%] top-[30%] h-[2px] w-[52%] rotate-6 bg-brand-blue/35" />
      <div className="relative m-auto">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-brand-blue shadow-sm ring-1 ring-border">
          <Map size={34} />
        </span>
        <p className="mt-4 text-xl font-semibold text-ink">Map and route visualization will be displayed here.</p>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          Future routing can connect to Mapbox, Google Maps, or OR-Tools while preserving business-priority logic.
        </p>
      </div>
    </section>
  );
}
