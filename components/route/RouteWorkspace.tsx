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
    <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
      <div className="min-w-0 pointer-events-auto">
        <RouteMap
          stops={stops}
          provider={provider}
          optimizeWaypoints={optimizeWaypoints}
          selectedStopId={selectedStopId}
          onSelectStop={onSelectStop}
          onRouteCalculated={onRouteCalculated}
        />
      </div>
      <RouteStopOrderPanel
        stops={stops}
        selectedStopId={selectedStopId}
        onSelectStop={onSelectStop}
        routeLegs={routeLegs}
      />
    </section>
  );
}
