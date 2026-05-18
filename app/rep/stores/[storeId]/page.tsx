import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/ui/MetricCard";
import { PriorityBadge, StatusBadge } from "@/components/ui/Badge";
import { SectionCard } from "@/components/ui/SectionCard";
import { VisitChecklist } from "@/components/stores/VisitChecklist";
import { getSalesRepUser, queryMartStorePerformance, queryMartVisitROI } from "@/lib/services/databricksService";
import { getStoreById } from "@/lib/services/storeService";
import { getVisitForStore } from "@/lib/services/visitService";
import { formatCurrency, formatDate } from "@/lib/utils/format";

export default async function StoreDetailPage({ params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await params;
  const [user, store, visit, performance, roi] = await Promise.all([
    getSalesRepUser(),
    getStoreById(storeId),
    getVisitForStore(storeId),
    queryMartStorePerformance(storeId),
    queryMartVisitROI(storeId)
  ]);

  if (!store || !visit || !performance || !roi) notFound();

  return (
    <AppShell
      role="sales_rep"
      title={store.name}
      subtitle="Store detail combines recommendation context, mock Databricks performance signals, and local visit execution state."
    >
      <SectionCard className="mb-5 bg-blue-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <StatusBadge status={store.status} />
              <PriorityBadge score={store.priorityScore} />
            </div>
            <p className="text-sm leading-6 text-slate-600">{store.address}</p>
            <p className="mt-1 text-sm text-slate-500">{store.banner} · {store.region} · Assigned to {user.name}</p>
          </div>
          <div className="rounded-2xl bg-brand-blue px-5 py-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Priority score</p>
            <p className="mt-1 text-3xl font-semibold">{store.priorityScore}</p>
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Estimated opportunity" value={formatCurrency(store.estimatedOpportunity)} />
        <MetricCard label="Last visit" value={formatDate(store.lastVisitDate)} accent="signal" />
        <MetricCard label="Revenue change" value={`${performance.revenueChangePercent}%`} detail="Last 4 weeks vs previous 4 weeks" accent="warning" />
        <MetricCard label="ROI score" value={roi.roiScore.toString()} detail={`${roi.confidenceLevel} confidence`} />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_420px]">
        <div className="grid gap-5">
          <SectionCard title="Store identity">
            <div className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              <p><span className="font-semibold">Address:</span> {store.address}</p>
              <p><span className="font-semibold">Region:</span> {store.region}</p>
              <p><span className="font-semibold">Banner:</span> {store.banner}</p>
              <p><span className="font-semibold">Assigned rep:</span> {user.name}</p>
            </div>
          </SectionCard>

          <SectionCard title="Recommendation reasons">
            <ul className="mt-3 grid gap-2 text-sm text-slate-700">
              {store.recommendationReasons.map((reason) => (
              <li key={reason} className="rounded-xl bg-muted-surface px-3 py-2 ring-1 ring-border">{reason}</li>
              ))}
            </ul>
          </SectionCard>

          <section className="grid gap-4 sm:grid-cols-2">
            <SectionCard title="Sales trend summary">
              <p className="mt-3 text-sm text-slate-600">
                Revenue moved from {formatCurrency(performance.revenuePrevious4Weeks)} to {formatCurrency(performance.revenueLast4Weeks)}.
                Volume changed {performance.volumeChangePercent}% and margin changed {performance.marginChangePercent}%.
              </p>
            </SectionCard>
            <SectionCard title="ROI summary">
              <p className="mt-3 text-sm text-slate-600">
                Last visit generated {formatCurrency(roi.upliftRevenue)} uplift revenue and {formatCurrency(roi.upliftMargin)} uplift margin.
                ROI score is {roi.roiScore} with {roi.confidenceLevel} confidence.
              </p>
            </SectionCard>
          </section>

          <SectionCard title="Recommended actions">
            <ul className="mt-3 grid gap-2 text-sm text-slate-700">
              <li className="rounded-xl bg-muted-surface px-3 py-2 ring-1 ring-border">Check promotion execution and shelf presence for priority SKUs.</li>
              <li className="rounded-xl bg-muted-surface px-3 py-2 ring-1 ring-border">Review stock gaps and propose order recovery for underperforming categories.</li>
              <li className="rounded-xl bg-muted-surface px-3 py-2 ring-1 ring-border">Capture competitor activity and any store manager objections in visit notes.</li>
            </ul>
          </SectionCard>
        </div>

        <VisitChecklist items={visit.checklist} />
      </div>
    </AppShell>
  );
}
