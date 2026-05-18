import { AppShell } from "@/components/layout/AppShell";
import { MapPlaceholder } from "@/components/map/MapPlaceholder";
import { RouteStopCard } from "@/components/route/RouteStopCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { getSalesRepUser } from "@/lib/services/databricksService";
import { getRouteStopsWithStores } from "@/lib/services/routeOptimizationService";
import { formatCurrency, formatMinutes } from "@/lib/utils/format";

export default async function RoutePage() {
  const user = await getSalesRepUser();
  const route = await getRouteStopsWithStores(user.repId ?? "rep-1");

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
      subtitle="The MVP uses a mocked optimized order. Future optimization will combine travel time with priority, opportunity, visit gaps, and store constraints."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total visits" value={route.stops.length.toString()} />
        <MetricCard label="Total distance" value={`${route.totalDistanceKm} km`} accent="signal" />
        <MetricCard label="Total duration" value={formatMinutes(route.totalDurationMinutes)} accent="warning" />
        <MetricCard label="Estimated opportunity" value={formatCurrency(route.totalEstimatedOpportunity)} />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
        <MapPlaceholder />
        <SectionCard title="Ordered stops" eyebrow={`${route.stops.length} visits planned`}>
          <div className="grid gap-3">
            {route.stops.map((stop) => (
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
    </AppShell>
  );
}
