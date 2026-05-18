import { routes, stores } from "@/lib/mock-data/fieldData";
import type { Route } from "@/lib/types/domain";

/*
Route ownership split:
Databricks decides which stores should be visited and why. The app/backend decides the
optimized daily route order, using analytical recommendations plus operational constraints.

Future route optimization should combine priority score, sales opportunity, last visit date,
store opening hours, rep working hours, visit duration, travel time, mandatory visits, and
optional visits. Shortest distance alone is not enough for FMCG field execution.

TODO production route optimization:
- Mapbox Optimization API
- Google Maps API
- Google OR-Tools
- business-priority route optimization
*/

export async function getTodayRouteForRep(repId: string): Promise<Route | undefined> {
  // TODO: Replace mock route with Mapbox Optimization API, Google Maps API, Google OR-Tools,
  // and business-priority route optimization rules.
  return routes.find((route) => route.repId === repId);
}

export async function getRouteStopsWithStores(repId: string) {
  const route = await getTodayRouteForRep(repId);
  if (!route) return undefined;
  return {
    ...route,
    stops: route.stops.map((stop) => ({
      ...stop,
      store: stores.find((store) => store.id === stop.storeId)
    }))
  };
}
