import { Map } from "lucide-react";
import type { RouteMapStop } from "@/lib/services/googleMapsRouteService";

export function MapPlaceholder({
  className = "",
  stops = [],
  selectedStopId,
  onSelectStop
}: {
  className?: string;
  stops?: RouteMapStop[];
  selectedStopId?: string;
  onSelectStop?: (stopId: string) => void;
}) {
  const markerPositions = [
    "left-[18%] top-[28%]",
    "left-[38%] top-[48%]",
    "left-[68%] top-[35%]",
    "left-[54%] top-[65%]",
    "left-[78%] top-[58%]"
  ];

  return (
    <section className={`relative flex min-h-[420px] overflow-hidden rounded-3xl border border-border bg-blue-soft p-6 text-center shadow-sm lg:min-h-[650px] ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,75,147,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(0,75,147,0.09)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="pointer-events-none absolute left-[19%] top-[30%] h-[2px] w-[52%] rotate-6 bg-brand-blue/35" />
      {(stops.length ? stops : [undefined, undefined, undefined]).slice(0, 5).map((stop, index) => {
        const isSelected = stop?.id === selectedStopId;
        return (
          <button
            key={stop?.id ?? index}
            type="button"
            onClick={() => stop && onSelectStop?.(stop.id)}
            className={`absolute ${markerPositions[index]} flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white ring-4 ring-white transition ${
              isSelected || index === 0 ? "bg-brand-red scale-110" : "bg-brand-blue"
            }`}
          >
            {index + 1}
          </button>
        );
      })}
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
