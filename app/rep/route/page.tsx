import { AppShell } from "@/components/layout/AppShell";
import { RoutePlanner } from "@/components/route/RoutePlanner";
import { getSalesRepUser } from "@/lib/services/databricksService";
import {
  getDefaultRouteProvider,
  getRouteStopsWithStores,
  hasGoogleMapsApiKey
} from "@/lib/services/routeOptimizationService";
import type { RouteMapStop } from "@/lib/services/googleMapsRouteService";

export default async function RoutePage() {
  const user = await getSalesRepUser();
  const route = await getRouteStopsWithStores(user.repId ?? "rep-1");
  const defaultProvider = getDefaultRouteProvider();
  const hasGoogleKey = hasGoogleMapsApiKey();

  if (!route) {
    return (
      <AppShell role="sales_rep" title="Today's route">
        <p>No route found.</p>
      </AppShell>
    );
  }

  return (
    <AppShell
      role="sales_rep"
      title="Today's route"
      subtitle="Google Maps calculates driving distance, duration, route line, and optional waypoint order from the existing mock store coordinates."
    >
      <RoutePlanner
        stops={route.stops as RouteMapStop[]}
        totalEstimatedOpportunity={route.totalEstimatedOpportunity}
        defaultProvider={defaultProvider}
        hasGoogleMapsKey={hasGoogleKey}
      />
    </AppShell>
  );
}
