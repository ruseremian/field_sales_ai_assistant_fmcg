import { Map } from "lucide-react";

export function MapPlaceholder() {
  return (
    <section className="relative flex min-h-[360px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 p-6 text-center shadow-soft">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="absolute left-10 top-12 h-20 w-20 rounded-full bg-emerald-400/20 blur-2xl" />
      <div className="absolute bottom-10 right-10 h-24 w-24 rounded-full bg-blue-400/20 blur-2xl" />
      <div className="relative m-auto">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-emerald-200 ring-1 ring-white/15">
          <Map size={34} />
        </span>
        <p className="mt-4 text-xl font-semibold text-white">Map and route visualization will be displayed here.</p>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">
          Future routing can connect to Mapbox, Google Maps, or OR-Tools while preserving business-priority logic.
        </p>
      </div>
    </section>
  );
}
