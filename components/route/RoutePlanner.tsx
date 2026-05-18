"use client";

import { useCallback, useMemo, useState } from "react";
import { MapPinned, SlidersHorizontal } from "lucide-react";
import { RouteMap } from "@/components/map/RouteMap";
import { RouteStopCard } from "@/components/route/RouteStopCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionCard } from "@/components/ui/SectionCard";
import {
  buildMockRouteResult,
  type NormalizedRouteResult,
  type RouteMapStop,
  type RouteProvider
} from "@/lib/services/googleMapsRouteService";
import { formatCurrency, formatMinutes } from "@/lib/utils/format";

type RoutePlannerProps = {
  stops: RouteMapStop[];
  totalEstimatedOpportunity: number;
  defaultProvider: RouteProvider;
  hasGoogleMapsKey: boolean;
};

export function RoutePlanner({
  stops,
  totalEstimatedOpportunity,
  defaultProvider,
  hasGoogleMapsKey
}: RoutePlannerProps) {
  const [provider, setProvider] = useState<RouteProvider>(defaultProvider);
  const [optimizeWaypoints, setOptimizeWaypoints] = useState(true);
  const [routeResult, setRouteResult] = useState<NormalizedRouteResult>(() =>
    buildMockRouteResult(stops, hasGoogleMapsKey ? [] : ["Google Maps API key is missing. Mock route values are shown."])
  );

  const orderedStops = routeResult.orderedStops;
  const explanation = useMemo(() => {
    const providerText =
      routeResult.provider === "google"
        ? "Google Maps calculates the driving order, distance, duration, route line, and legs from the mock store coordinates."
        : "Mock fallback is currently used for distance, duration, legs, and route visualization.";
    const optimizationText = routeResult.optimizationApplied
      ? "Waypoint optimization was applied by Google Maps."
      : optimizeWaypoints
        ? "Waypoint optimization is requested; it will apply when Google Maps returns an optimized order."
        : "Current stop order is preserved.";

    return [
      "Databricks mock data decides which stores are recommended and why.",
      providerText,
      optimizationText,
      routeResult.warnings.length ? `Fallback reason: ${routeResult.warnings.join(" ")}` : "No fallback warnings are active."
    ];
  }, [optimizeWaypoints, routeResult]);

  const handleRouteCalculated = useCallback((result: NormalizedRouteResult) => {
    setRouteResult(result);
  }, []);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total stops" value={orderedStops.length.toString()} />
        <MetricCard label="Total distance" value={`${routeResult.totalDistanceKm} km`} accent="signal" />
        <MetricCard label="Total duration" value={formatMinutes(routeResult.totalDurationMinutes)} accent="warning" />
        <MetricCard label="Estimated opportunity" value={formatCurrency(totalEstimatedOpportunity)} accent="field" />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_440px]">
        <div className="grid gap-5">
          <RouteMap
            stops={stops}
            provider={provider}
            optimizeWaypoints={optimizeWaypoints}
            onRouteCalculated={handleRouteCalculated}
          />

          <SectionCard title="Route legs" eyebrow={`${routeResult.provider} provider`}>
            {routeResult.legs.length ? (
              <div className="grid gap-2">
                {routeResult.legs.map((leg) => (
                  <div key={`${leg.from}-${leg.to}`} className="grid gap-2 rounded-2xl border border-border bg-muted-surface p-3 text-sm sm:grid-cols-[1fr_auto_auto] sm:items-center">
                    <div>
                      <p className="font-semibold text-ink">{leg.from}</p>
                      <p className="text-muted-foreground">to {leg.to}</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 font-semibold text-brand-blue ring-1 ring-border">{leg.distanceKm} km</span>
                    <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700 ring-1 ring-border">{formatMinutes(leg.durationMinutes)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Add at least two route stops to calculate route legs.</p>
            )}
          </SectionCard>
        </div>

        <div className="grid content-start gap-5">
          <SectionCard
            title="Route settings"
            eyebrow="Provider control"
            action={<SlidersHorizontal className="text-brand-blue" size={20} />}
          >
            <div className="grid gap-4">
              <div>
                <p className="text-sm font-semibold text-ink">Provider</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(["google", "mock"] as RouteProvider[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setProvider(item)}
                      className={`touch-target rounded-xl border px-3 text-sm font-semibold ${
                        provider === item
                          ? "border-brand-blue bg-blue-soft text-brand-blue"
                          : "border-border bg-white text-slate-700"
                      }`}
                    >
                      {item === "google" ? "Google Maps" : "Mock"}
                    </button>
                  ))}
                </div>
                {!hasGoogleMapsKey ? (
                  <p className="mt-2 text-xs leading-5 text-brand-red">Google Maps needs NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.</p>
                ) : null}
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">Optimization</p>
                <div className="mt-2 grid gap-2">
                  <label className="flex touch-target items-center gap-3 rounded-xl border border-border bg-white px-3 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="optimization"
                      checked={optimizeWaypoints}
                      onChange={() => setOptimizeWaypoints(true)}
                      className="h-4 w-4 accent-brand-blue"
                    />
                    Optimize waypoint order
                  </label>
                  <label className="flex touch-target items-center gap-3 rounded-xl border border-border bg-white px-3 text-sm text-slate-700">
                    <input
                      type="radio"
                      name="optimization"
                      checked={!optimizeWaypoints}
                      onChange={() => setOptimizeWaypoints(false)}
                      className="h-4 w-4 accent-brand-blue"
                    />
                    Keep current order
                  </label>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="How this route was calculated" eyebrow="Route logic" action={<MapPinned className="text-brand-blue" size={20} />}>
            <ul className="grid gap-2 text-sm leading-6 text-muted-foreground">
              {explanation.map((item) => (
                <li key={item} className="rounded-xl bg-muted-surface px-3 py-2 ring-1 ring-border">
                  {item}
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Ordered stops" eyebrow={`${orderedStops.length} visits planned`}>
            <div className="grid gap-3">
              {orderedStops.map((stop) => (
                <RouteStopCard
                  key={stop.id}
                  stopOrder={stop.stopOrder}
                  estimatedArrival={stop.estimatedArrival}
                  estimatedVisitDurationMinutes={stop.estimatedVisitDurationMinutes}
                  travelTimeFromPreviousMinutes={stop.travelTimeFromPreviousMinutes}
                  priorityScore={stop.priorityScore}
                  store={stop.store}
                />
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
