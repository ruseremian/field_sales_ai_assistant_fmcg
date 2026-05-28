"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  APIProvider,
  ControlPosition,
  InfoWindow,
  Map,
  Marker,
  Polyline,
  useMap,
  useMapsLibrary
} from "@vis.gl/react-google-maps";
import { MapPlaceholder } from "@/components/map/MapPlaceholder";
import {
  buildMockRouteResult,
  calculateGoogleMapsRoute,
  type NormalizedRouteResult,
  type RouteMapStop,
  type RouteProvider
} from "@/lib/services/googleMapsRouteService";
import { formatCurrency } from "@/lib/utils/format";

type RouteMapProps = {
  stops: RouteMapStop[];
  provider: RouteProvider;
  optimizeWaypoints: boolean;
  selectedStopId?: string;
  onSelectStop: (stopId: string) => void;
  onRouteCalculated: (result: NormalizedRouteResult) => void;
  className?: string;
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

function PanToSelectedStop({ stop }: { stop?: RouteMapStop }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !stop) return;
    map.panTo({ lat: stop.store.latitude, lng: stop.store.longitude });
    if ((map.getZoom() ?? 0) < 13) {
      map.setZoom(13);
    }
  }, [map, stop]);

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

function GoogleRouteMap({
  stops,
  routeResult,
  selectedStopId,
  onSelectStop,
  className = ""
}: {
  stops: RouteMapStop[];
  routeResult?: NormalizedRouteResult;
  selectedStopId?: string;
  onSelectStop: (stopId: string) => void;
  className?: string;
}) {
  const orderedStops = routeResult?.orderedStops ?? stops;
  const center = useMemo(() => routeCenter(orderedStops), [orderedStops]);
  const fallbackPath = useMemo(
    () => orderedStops.map((stop) => ({ lat: stop.store.latitude, lng: stop.store.longitude })),
    [orderedStops]
  );
  const selectedStop = orderedStops.find((stop) => stop.id === selectedStopId);
  const buildMarkerIcon = (isSelected: boolean) =>
    typeof google === "undefined"
      ? undefined
      : {
          path: google.maps.SymbolPath.CIRCLE,
          scale: isSelected ? 18 : 14,
          fillColor: isSelected ? "#c8182d" : "#004b93",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 3
        };

  return (
    <div
      className={`relative isolate h-[420px] min-h-[420px] w-full overflow-hidden rounded-3xl border border-border bg-blue-soft shadow-sm lg:h-[650px] lg:min-h-[650px] ${className} pointer-events-auto`}
      style={{ touchAction: "none" }}
    >
      <Map
        defaultCenter={center}
        defaultZoom={11}
        gestureHandling="greedy"
        scrollwheel={true}
        draggable={true}
        keyboardShortcuts={true}
        disableDefaultUI={false}
        disableDoubleClickZoom={false}
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={true}
        zoomControl={true}
        zoomControlOptions={{ position: ControlPosition.RIGHT_TOP }}
        draggableCursor="grab"
        draggingCursor="grabbing"
        className="h-full w-full pointer-events-auto"
      >
        <FitBounds stops={orderedStops} />
        <PanToSelectedStop stop={selectedStop} />
        {routeResult?.polyline ? (
          <Polyline
            encodedPath={routeResult.polyline}
            strokeColor="#004b93"
            strokeOpacity={0.85}
            strokeWeight={5}
            clickable={false}
            draggable={false}
            editable={false}
          />
        ) : (
          <Polyline
            path={fallbackPath}
            strokeColor="#004b93"
            strokeOpacity={0.65}
            strokeWeight={4}
            clickable={false}
            draggable={false}
            editable={false}
          />
        )}
        {orderedStops.map((stop, index) => (
          <Marker
            key={stop.id}
            position={{ lat: stop.store.latitude, lng: stop.store.longitude }}
            onClick={() => onSelectStop(stop.id)}
            label={{
              text: String(index + 1),
              color: "#ffffff",
              fontWeight: "700"
            }}
            icon={buildMarkerIcon(selectedStopId === stop.id)}
            title={stop.store.name}
          />
        ))}
        {selectedStop ? (
          <InfoWindow
            position={{ lat: selectedStop.store.latitude, lng: selectedStop.store.longitude }}
            onCloseClick={() => onSelectStop("")}
          >
            <div className="max-w-[220px] p-1 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Stop {orderedStops.findIndex((stop) => stop.id === selectedStop.id) + 1}
              </p>
              <h3 className="mt-1 font-semibold text-slate-900">{selectedStop.store.name}</h3>
              <p className="mt-1 text-xs text-slate-600">Priority {selectedStop.priorityScore}</p>
              <p className="mt-1 text-xs text-slate-600">
                Opportunity {formatCurrency(selectedStop.store.estimatedOpportunity)}
              </p>
              <Link
                href={`/rep/stores/${selectedStop.store.id}`}
                className="mt-3 inline-flex rounded-lg bg-brand-blue px-3 py-2 text-xs font-semibold text-white"
              >
                Open store detail
              </Link>
            </div>
          </InfoWindow>
        ) : null}
      </Map>
      <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-border bg-white/95 px-4 py-3 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Google Maps</p>
        <p className="mt-1 text-sm font-semibold text-ink">Driving route visualization</p>
      </div>
    </div>
  );
}

export function RouteMap({
  stops,
  provider,
  optimizeWaypoints,
  selectedStopId,
  onSelectStop,
  onRouteCalculated,
  className
}: RouteMapProps) {
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
    return <MapPlaceholder className={className} stops={stops} selectedStopId={selectedStopId} onSelectStop={onSelectStop} />;
  }

  return (
    <APIProvider apiKey={apiKey as string}>
      <RouteMapContent
        stops={stops}
        optimizeWaypoints={optimizeWaypoints}
        selectedStopId={selectedStopId}
        onSelectStop={onSelectStop}
        onRouteCalculated={onRouteCalculated}
        className={className}
      />
    </APIProvider>
  );
}

function RouteMapContent({
  stops,
  optimizeWaypoints,
  selectedStopId,
  onSelectStop,
  onRouteCalculated,
  className
}: {
  stops: RouteMapStop[];
  optimizeWaypoints: boolean;
  selectedStopId?: string;
  onSelectStop: (stopId: string) => void;
  onRouteCalculated: (result: NormalizedRouteResult) => void;
  className?: string;
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
      <GoogleRouteMap
        stops={stops}
        routeResult={routeResult}
        selectedStopId={selectedStopId}
        onSelectStop={onSelectStop}
        className={className}
      />
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
