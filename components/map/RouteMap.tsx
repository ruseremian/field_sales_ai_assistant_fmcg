"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { APIProvider, Map, Marker, Polyline, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { MapPlaceholder } from "@/components/map/MapPlaceholder";
import {
  buildMockRouteResult,
  calculateGoogleMapsRoute,
  type NormalizedRouteResult,
  type RouteMapStop,
  type RouteProvider
} from "@/lib/services/googleMapsRouteService";

type RouteMapProps = {
  stops: RouteMapStop[];
  provider: RouteProvider;
  optimizeWaypoints: boolean;
  onRouteCalculated: (result: NormalizedRouteResult) => void;
};

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function routeCenter(stops: RouteMapStop[]) {
  const first = stops[0]?.store;
  return {
    lat: first?.latitude ?? 48.5734,
    lng: first?.longitude ?? 7.7521
  };
}

function FitBounds({ stops }: { stops: RouteMapStop[] }) {
  const map = useMap();

  useEffect(() => {
    if (!map || stops.length === 0) return;
    const bounds = new google.maps.LatLngBounds();
    stops.forEach((stop) => {
      bounds.extend({ lat: stop.store.latitude, lng: stop.store.longitude });
    });
    map.fitBounds(bounds, 72);
  }, [map, stops]);

  return null;
}

function DirectionsCalculator({
  stops,
  optimizeWaypoints,
  onRouteCalculated
}: {
  stops: RouteMapStop[];
  optimizeWaypoints: boolean;
  onRouteCalculated: (result: NormalizedRouteResult) => void;
}) {
  const routesLibrary = useMapsLibrary("routes");

  useEffect(() => {
    let cancelled = false;

    async function calculate() {
      if (!routesLibrary) return;
      try {
        const result = await calculateGoogleMapsRoute({
          stops,
          optimizeWaypoints,
          directionsLibrary: routesLibrary
        });
        if (!cancelled) onRouteCalculated(result);
      } catch (error) {
        if (!cancelled) {
          onRouteCalculated(
            buildMockRouteResult(stops, [
              error instanceof Error
                ? `Google Maps route calculation failed: ${error.message}`
                : "Google Maps route calculation failed. Mock route values are shown."
            ])
          );
        }
      }
    }

    calculate();
    return () => {
      cancelled = true;
    };
  }, [optimizeWaypoints, onRouteCalculated, routesLibrary, stops]);

  return null;
}

function GoogleRouteMap({ stops, routeResult }: { stops: RouteMapStop[]; routeResult?: NormalizedRouteResult }) {
  const orderedStops = routeResult?.orderedStops ?? stops;
  const center = useMemo(() => routeCenter(orderedStops), [orderedStops]);
  const fallbackPath = useMemo(
    () => orderedStops.map((stop) => ({ lat: stop.store.latitude, lng: stop.store.longitude })),
    [orderedStops]
  );

  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-border bg-blue-soft shadow-sm">
      <Map
        defaultCenter={center}
        defaultZoom={11}
        gestureHandling="greedy"
        disableDefaultUI
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={false}
        className="h-[420px] w-full"
      >
        <FitBounds stops={orderedStops} />
        {routeResult?.polyline ? (
          <Polyline encodedPath={routeResult.polyline} strokeColor="#004b93" strokeOpacity={0.85} strokeWeight={5} />
        ) : (
          <Polyline path={fallbackPath} strokeColor="#004b93" strokeOpacity={0.65} strokeWeight={4} />
        )}
        {orderedStops.map((stop, index) => (
          <Marker
            key={stop.id}
            position={{ lat: stop.store.latitude, lng: stop.store.longitude }}
            label={{
              text: String(index + 1),
              color: "#ffffff",
              fontWeight: "700"
            }}
            title={stop.store.name}
          />
        ))}
      </Map>
      <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-border bg-white/95 px-4 py-3 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Google Maps</p>
        <p className="mt-1 text-sm font-semibold text-ink">Driving route visualization</p>
      </div>
    </div>
  );
}

export function RouteMap({ stops, provider, optimizeWaypoints, onRouteCalculated }: RouteMapProps) {
  const shouldUseGoogle = provider === "google" && Boolean(apiKey);
  const fallbackWarnings = useMemo(() => {
    if (provider === "google" && !apiKey) {
      return ["NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is missing. Mock route map is shown."];
    }
    if (provider === "mock") {
      return ["Mock provider selected. Google Maps route calculation is not used."];
    }
    return [];
  }, [provider]);

  useEffect(() => {
    if (!shouldUseGoogle) {
      onRouteCalculated(buildMockRouteResult(stops, fallbackWarnings));
    }
  }, [fallbackWarnings, onRouteCalculated, shouldUseGoogle, stops]);

  if (!shouldUseGoogle) {
    return <MapPlaceholder />;
  }

  return (
    <APIProvider apiKey={apiKey as string}>
      <RouteMapContent stops={stops} optimizeWaypoints={optimizeWaypoints} onRouteCalculated={onRouteCalculated} />
    </APIProvider>
  );
}

function RouteMapContent({
  stops,
  optimizeWaypoints,
  onRouteCalculated
}: {
  stops: RouteMapStop[];
  optimizeWaypoints: boolean;
  onRouteCalculated: (result: NormalizedRouteResult) => void;
}) {
  const initialResult = useMemo(() => buildMockRouteResult(stops), [stops]);
  const [routeResult, setRouteResult] = useMergedRouteResult(initialResult, onRouteCalculated);

  return (
    <>
      <DirectionsCalculator
        stops={stops}
        optimizeWaypoints={optimizeWaypoints}
        onRouteCalculated={(result) => {
          setRouteResult(result);
        }}
      />
      <GoogleRouteMap stops={stops} routeResult={routeResult} />
    </>
  );
}

function useMergedRouteResult(initialResult: NormalizedRouteResult, onRouteCalculated: (result: NormalizedRouteResult) => void) {
  const [routeResult, setRouteResultState] = useState(initialResult);

  const setRouteResult = useCallback(
    (result: NormalizedRouteResult) => {
      setRouteResultState(result);
      onRouteCalculated(result);
    },
    [onRouteCalculated]
  );

  return [routeResult, setRouteResult] as const;
}
