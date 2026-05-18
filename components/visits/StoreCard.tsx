import Link from "next/link";
import { ArrowUpRight, MapPin, PlusCircle } from "lucide-react";
import type { Store } from "@/lib/types/domain";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { PriorityBadge, StatusBadge } from "@/components/ui/Badge";

export function StoreCard({ store }: { store: Store }) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/70 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-ink">{store.name}</h2>
            <StatusBadge status={store.status} />
            <PriorityBadge score={store.priorityScore} />
          </div>
          <p className="mt-2 flex items-start gap-2 text-sm text-slate-600">
            <MapPin className="mt-0.5 shrink-0" size={16} />
            {store.address}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {store.banner} · {store.region} · Last visit {formatDate(store.lastVisitDate)}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-left ring-1 ring-slate-200/70 sm:text-right">
          <p className="text-xs font-semibold uppercase text-slate-500">Opportunity</p>
          <p className="text-lg font-semibold text-ink">{formatCurrency(store.estimatedOpportunity)}</p>
          <p className="text-xs text-slate-500">Score {store.priorityScore}</p>
        </div>
      </div>

      <ul className="mt-4 grid gap-2 text-sm leading-5 text-slate-700 sm:grid-cols-2">
        {store.recommendationReasons.map((reason) => (
          <li key={reason} className="rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200/60">
            {reason}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Link
          href={`/rep/stores/${store.id}`}
          className="touch-target inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-ink px-4 text-sm font-semibold text-white"
        >
          Open store detail
          <ArrowUpRight size={17} />
        </Link>
        {store.status !== "planned" ? (
          <button className="touch-target inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700">
            <PlusCircle size={18} />
            Add to today route
          </button>
        ) : null}
      </div>
    </article>
  );
}
