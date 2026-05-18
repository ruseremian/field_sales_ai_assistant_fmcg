import Link from "next/link";
import { Bot } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/ui/MetricCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { PowerBIEmbedPlaceholder } from "@/components/powerbi/PowerBIEmbedPlaceholder";
import { getManagerSummary } from "@/lib/services/databricksService";
import { getPowerBIEmbedConfig, getPowerBIEmbeddingTodoList } from "@/lib/services/powerbiService";
import { formatCurrency } from "@/lib/utils/format";

export default async function ManagerPage() {
  const [summary, config, todos] = await Promise.all([
    getManagerSummary(),
    getPowerBIEmbedConfig(),
    getPowerBIEmbeddingTodoList()
  ]);

  return (
    <AppShell
      role="manager"
      title="Manager reporting"
      subtitle="A lightweight operational summary surrounds the embedded Power BI reporting area. Dashboards remain in Power BI."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <MetricCard label="Visits planned today" value={summary.visitsPlannedToday.toString()} />
        <MetricCard label="Visits completed today" value={summary.visitsCompletedToday.toString()} accent="field" />
        <MetricCard label="Completion rate" value={`${summary.completionRate}%`} accent="signal" />
        <MetricCard label="Estimated opportunity" value={formatCurrency(summary.totalEstimatedOpportunity)} />
        <MetricCard label="Stores not visited 30+ days" value={summary.storesNotVisited30Days.toString()} accent="warning" />
        <MetricCard label="High-priority stores" value={summary.highPriorityStores.toString()} accent="ink" />
      </div>

      <div className="mt-6">
        <PowerBIEmbedPlaceholder />
      </div>

      <SectionCard className="mt-5" title="Power BI embedding placeholder" eyebrow="Deployment ready shell">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="mt-1 text-sm text-slate-600">
              Config keys are mocked now: {config.workspaceId}, {config.reportId}, {config.datasetId}.
            </p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              {todos.map((todo) => (
                <li key={todo} className="rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200/60">{todo}</li>
              ))}
            </ul>
          </div>
          <Link href="/assistant?role=manager" className="touch-target inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 font-semibold text-white shadow-sm">
            <Bot size={18} />
            Ask assistant
          </Link>
        </div>
      </SectionCard>
    </AppShell>
  );
}
