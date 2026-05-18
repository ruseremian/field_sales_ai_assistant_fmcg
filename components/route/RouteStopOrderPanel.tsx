"use client";

import Link from "next/link";
import { CheckCircle2, Clock3, MapPin, Navigation } from "lucide-react";
import type { NormalizedRouteLeg, RouteMapStop } from "@/lib/services/googleMapsRouteService";
import { PriorityBadge, StatusBadge } from "@/components/ui/Badge";
import { formatCurrency, formatMinutes } from "@/lib/utils/format";

type RouteStopOrderPanelProps = {
  stops: RouteMapStop[];
  selectedStopId?: string;
  onSelectStop: (stopId: string) => void;
  routeLegs: NormalizedRouteLeg[];
};

export function RouteStopOrderPanel({
  stops,
  selectedStopId,
  onSelectStop,
  routeLegs
}: RouteStopOrderPanelProps) {
  return (
    <aside className="flex min-h-[520px] flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm lg:max-h-[720px]">
      <div className="sticky top-0 z-10 border-b border-border bg-white px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Store order</p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-ink">Route stops</h2>
          <span className="rounded-full bg-blue-soft px-3 py-1 text-xs font-semibold text-brand-blue">
            {stops.length} visits
          </span>
        </div>
      </div>

      <div className="grid gap-3 overflow-y-auto p-3">
        {stops.map((stop, index) => {
          const isSelected = selectedStopId === stop.id;
          const legFromPrevious = index === 0 ? undefined : routeLegs[index - 1];

          return (
            <article
              key={stop.id}
              className={`rounded-2xl border p-4 shadow-sm transition ${
                isSelected
                  ? "border-brand-blue bg-blue-soft ring-2 ring-brand-blue/15"
                  : "border-border bg-white hover:border-brand-blue"
              }`}
            >
              <button type="button" onClick={() => onSelectStop(stop.id)} className="w-full text-left">
                <div className="flex items-start gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold ${
                      isSelected ? "bg-brand-red text-white" : "bg-brand-blue text-white"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-ink">{stop.store.name}</h3>
                      <StatusBadge status={stop.store.status} />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{stop.store.banner}</p>
                    <p className="mt-2 flex items-start gap-2 text-sm leading-5 text-slate-600">
                      <MapPin className="mt-0.5 shrink-0 text-brand-blue" size={15} />
                      {stop.store.address}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <PriorityBadge score={stop.priorityScore} />
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-brand-blue ring-1 ring-border">
                    {formatCurrency(stop.store.estimatedOpportunity)}
                  </span>
                </div>

                <div className="mt-3 grid gap-2 text-xs font-medium text-slate-700 sm:grid-cols-2">
                  <span className="inline-flex items-center gap-1 rounded-xl bg-muted-surface px-2.5 py-2">
                    <Clock3 size={13} />
                    Arrive {stop.estimatedArrival}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-xl bg-muted-surface px-2.5 py-2">
                    <Navigation size={13} />
                    {legFromPrevious ? `${legFromPrevious.distanceKm} km · ${formatMinutes(legFromPrevious.durationMinutes)}` : "Start"}
                  </span>
                </div>
              </button>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <Link
                  href={`/rep/stores/${stop.store.id}`}
                  className="touch-target inline-flex items-center justify-center rounded-xl bg-brand-blue px-3 text-sm font-semibold text-white"
                >
                  Open store
                </Link>
                {stop.store.status !== "completed" ? (
                  <button
                    type="button"
                    className="touch-target inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-3 text-sm font-semibold text-slate-700"
                  >
                    <CheckCircle2 size={16} />
                    Mark completed
                  </button>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
}
