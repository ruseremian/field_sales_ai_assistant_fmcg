import { BarChart3 } from "lucide-react";

export function PowerBIEmbedPlaceholder() {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-300" />
        <span className="h-3 w-3 rounded-full bg-amber-300" />
        <span className="h-3 w-3 rounded-full bg-emerald-300" />
        <span className="ml-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Power BI Embedded</span>
      </div>
      <div className="flex min-h-[430px] items-center justify-center bg-[linear-gradient(135deg,#ffffff_0%,#f8fafc_55%,#eff6ff_100%)] p-6 text-center">
        <div>
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-signal ring-1 ring-blue-100">
            <BarChart3 size={34} />
          </span>
          <p className="mt-4 text-xl font-semibold text-ink">Power BI report will be embedded here.</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
          Manager dashboards stay in Power BI. This app provides operational context, navigation, and assistant access around those reports.
          </p>
        </div>
      </div>
    </section>
  );
}
