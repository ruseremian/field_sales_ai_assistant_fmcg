import Link from "next/link";
import { Bot, CheckCircle2, Route, Store } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { getRepRouteSummary, getSalesRepUser } from "@/lib/services/databricksService";
import { formatCurrency, formatMinutes } from "@/lib/utils/format";

export default async function RepHomePage() {
  const user = await getSalesRepUser();
  const summary = await getRepRouteSummary(user.repId ?? "rep-1");
  const completion = `${summary.completedVisits}/${summary.totalVisits}`;
  const progress = Math.round((summary.completedVisits / summary.totalVisits) * 100);

  return (
    <AppShell
      role="sales_rep"
      title={`Good morning, ${user.name.split(" ")[0]}`}
      subtitle="Your field execution plan for today is ready. Start with the highest-priority stores and keep checklist notes current during each visit."
    >
      <SectionCard className="mb-5 bg-gradient-to-br from-slate-950 to-slate-800 text-white">
        <div className="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">Next best action</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Start with the highest-priority Strasbourg stops.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Today&apos;s route balances opportunity, visit gaps, and promotion execution risk. Keep notes current so operational state can sync later.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
            <p className="text-sm text-slate-300">Completion progress</p>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-emerald-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-3 text-2xl font-semibold">{completion} visits</p>
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <MetricCard label="Recommended visits" value={summary.recommendedVisits.toString()} detail="Ranked by Databricks recommendation logic" />
        <MetricCard label="High-priority stores" value={summary.highPriorityStores.toString()} detail="Priority score 85+" accent="warning" />
        <MetricCard label="Driving time" value={formatMinutes(summary.estimatedDrivingTimeMinutes)} detail={`${summary.estimatedDistanceKm} km estimated`} accent="signal" />
        <MetricCard label="Sales opportunity" value={formatCurrency(summary.estimatedSalesOpportunity)} detail="Estimated from curated marts" />
        <MetricCard label="Completion today" value={completion} detail="Mock visit execution status" accent="ink" />
        <MetricCard label="Route status" value="Optimized" detail="Business priority plus travel sequence" accent="signal" />
      </div>

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <Link href="/rep/route" className="touch-target inline-flex items-center justify-center gap-2 rounded-xl bg-field px-4 font-semibold text-white shadow-sm">
          <Route size={18} />
          View Today&apos;s Route
        </Link>
        <Link href="/rep/visits" className="touch-target inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 font-semibold text-white shadow-sm">
          <Store size={18} />
          View Recommended Visits
        </Link>
        <Link href="/assistant?role=sales_rep" className="touch-target inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 font-semibold text-slate-700 shadow-sm">
          <Bot size={18} />
          Ask AI Assistant
        </Link>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 text-field" size={22} />
          <div>
            <h2 className="text-lg font-semibold text-ink">What needs attention</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Visit high-priority stores first, verify promotion execution, and capture notes that can later sync into operational state and Databricks analytics.
            </p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
