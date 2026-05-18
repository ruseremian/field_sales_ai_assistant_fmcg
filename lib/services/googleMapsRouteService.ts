import type { Store } from "@/lib/types/domain";

export type RouteProvider = "google" | "mock";

export type RouteMapStop = {
  id: string;
  storeId: string;
  stopOrder: number;
  estimatedArrival: string;
  estimatedVisitDurationMinutes: number;
  travelTimeFromPreviousMinutes: number;
  priorityScore: number;
  store: Store;
};

export type NormalizedRouteLeg = {
  from: string;
  to: string;
  distanceKm: number;
  durationMinutes: number;
};

export type NormalizedRouteResult = {
  orderedStops: RouteMapStop[];
  totalDistanceKm: number;
  totalDurationMinutes: number;
  legs: NormalizedRouteLeg[];
  polyline?: string;
  provider: RouteProvider;
  optimizationApplied: boolean;
  calculatedAt: string;
  warnings: string[];
};

type GoogleRouteInput = {
  stops: RouteMapStop[];
  optimizeWaypoints: boolean;
  directionsLibrary: google.maps.RoutesLibrary;
};

function metersToKm(value?: number) {
  return Math.round(((value ?? 0) / 1000) * 10) / 10;
}

function secondsToMinutes(value?: number) {
  return Math.max(0, Math.round((value ?? 0) / 60));
}

export function buildMockRouteResult(stops: RouteMapStop[], warnings: string[] = []): NormalizedRouteResult {
  const orderedStops = [...stops].sort((a, b) => a.stopOrder - b.stopOrder);
  const legs = orderedStops.slice(1).map((stop, index) => ({
    from: orderedStops[index].store.name,
    to: stop.store.name,
    distanceKm: Math.max(3, Math.round((stop.travelTimeFromPreviousMinutes * 0.75) * 10) / 10),
    durationMinutes: stop.travelTimeFromPreviousMinutes
  }));

  return {
    orderedStops,
    totalDistanceKm: Math.round(legs.reduce((sum, leg) => sum + leg.distanceKm, 0) * 10) / 10,
    totalDurationMinutes: orderedStops.reduce(
      (sum, stop) => sum + stop.estimatedVisitDurationMinutes + stop.travelTimeFromPreviousMinutes,
      0
    ),
    legs,
    provider: "mock",
    optimizationApplied: false,
    calculatedAt: new Date().toISOString(),
    warnings
  };
}

export async function calculateGoogleMapsRoute({
  stops,
  optimizeWaypoints,
  directionsLibrary
}: GoogleRouteInput): Promise<NormalizedRouteResult> {
  if (stops.length < 2) {
    return buildMockRouteResult(stops, ["At least two stops are needed to calculate a Google Maps route."]);
  }

  const service = new directionsLibrary.DirectionsService();
  const orderedInputStops = [...stops].sort((a, b) => a.stopOrder - b.stopOrder);
  const origin = orderedInputStops[0];
  const destination = orderedInputStops[orderedInputStops.length - 1];
  const middleStops = orderedInputStops.slice(1, -1);

  // TODO: Move this calculation server-side later with Google Routes API if route calculation
  // needs to be audited, cached, or combined with protected business constraints.
  const response = await service.route({
    origin: { lat: origin.store.latitude, lng: origin.store.longitude },
    destination: { lat: destination.store.latitude, lng: destination.store.longitude },
    waypoints: middleStops.map((stop) => ({
      location: { lat: stop.store.latitude, lng: stop.store.longitude },
      stopover: true
    })),
    optimizeWaypoints,
    travelMode: google.maps.TravelMode.DRIVING
  });

  const route = response.routes[0];
  if (!route) {
    return buildMockRouteResult(stops, ["Google Maps did not return a route. Mock route values are shown."]);
  }

  const waypointOrder = route.waypoint_order ?? [];
  const reorderedMiddleStops =
    optimizeWaypoints && waypointOrder.length
      ? waypointOrder.map((index) => middleStops[index]).filter(Boolean)
      : middleStops;
  const orderedStops = [origin, ...reorderedMiddleStops, destination].map((stop, index) => ({
    ...stop,
    stopOrder: index + 1,
    travelTimeFromPreviousMinutes: index === 0 ? 0 : stop.travelTimeFromPreviousMinutes
  }));

  const legs = route.legs.map((leg, index) => ({
    from: orderedStops[index]?.store.name ?? leg.start_address,
    to: orderedStops[index + 1]?.store.name ?? leg.end_address,
    distanceKm: metersToKm(leg.distance?.value),
    durationMinutes: secondsToMinutes(leg.duration?.value)
  }));

  return {
    orderedStops,
    totalDistanceKm: Math.round(legs.reduce((sum, leg) => sum + leg.distanceKm, 0) * 10) / 10,
    totalDurationMinutes:
      legs.reduce((sum, leg) => sum + leg.durationMinutes, 0) +
      orderedStops.reduce((sum, stop) => sum + stop.estimatedVisitDurationMinutes, 0),
    legs,
    polyline: route.overview_polyline,
    provider: "google",
    optimizationApplied: optimizeWaypoints && waypointOrder.length > 0,
    calculatedAt: new Date().toISOString(),
    warnings: []
  };
}
