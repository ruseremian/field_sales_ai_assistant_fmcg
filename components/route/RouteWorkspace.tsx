"use client";

import { RouteMap } from "@/components/map/RouteMap";
import { RouteStopOrderPanel } from "@/components/route/RouteStopOrderPanel";
import type { NormalizedRouteLeg, RouteMapStop, RouteProvider } from "@/lib/services/googleMapsRouteService";

type RouteWorkspaceProps = {
  stops: RouteMapStop[];
  routeLegs: NormalizedRouteLeg[];
  provider: RouteProvider;
  optimizeWaypoints: boolean;
  selectedStopId?: string;
  onSelectStop: (stopId: string) => void;
  onRouteCalculated: Parameters<typeof RouteMap>[0]["onRouteCalculated"];
};

export function RouteWorkspace({
  stops,
  routeLegs,
  provider,
  optimizeWaypoints,
  selectedStopId,
  onSelectStop,
  onRouteCalculated
}: RouteWorkspaceProps) {
  return (
    <section className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(340px,0.95fr)]">
      <RouteMap
        stops={stops}
        provider={provider}
        optimizeWaypoints={optimizeWaypoints}
        selectedStopId={selectedStopId}
        onSelectStop={onSelectStop}
        onRouteCalculated={onRouteCalculated}
        className="min-h-[420px] lg:min-h-[650px]"
      />
      <RouteStopOrderPanel
        stops={stops}
        selectedStopId={selectedStopId}
        onSelectStop={onSelectStop}
        routeLegs={routeLegs}
      />
    </section>
  );
}
