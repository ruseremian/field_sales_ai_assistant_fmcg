import Link from "next/link";
import { Clock3, MapPin } from "lucide-react";
import type { Store } from "@/lib/types/domain";
import { formatMinutes } from "@/lib/utils/format";
import { PriorityBadge } from "@/components/ui/Badge";

export function RouteStopCard({
  stopOrder,
  estimatedArrival,
  estimatedVisitDurationMinutes,
  travelTimeFromPreviousMinutes,
  priorityScore,
  store
}: {
  stopOrder: number;
  estimatedArrival: string;
  estimatedVisitDurationMinutes: number;
  travelTimeFromPreviousMinutes: number;
  priorityScore: number;
  store?: Store;
}) {
  if (!store) return null;

  return (
    <Link
      href={`/rep/stores/${store.id}`}
      className="group block rounded-2xl border border-border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-blue hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-blue text-sm font-semibold text-white">
          {stopOrder}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-ink">{store.name}</p>
            <PriorityBadge score={priorityScore} />
          </div>
          <p className="mt-2 flex items-start gap-2 text-sm leading-5 text-slate-500">
            <MapPin className="mt-0.5 shrink-0" size={15} />
            {store.address}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-soft px-2.5 py-1 text-brand-blue">
              <Clock3 size={13} />
              Arrive {estimatedArrival}
            </span>
            <span className="rounded-full bg-muted-surface px-2.5 py-1">Visit {formatMinutes(estimatedVisitDurationMinutes)}</span>
            <span className="rounded-full bg-muted-surface px-2.5 py-1">Drive {formatMinutes(travelTimeFromPreviousMinutes)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
