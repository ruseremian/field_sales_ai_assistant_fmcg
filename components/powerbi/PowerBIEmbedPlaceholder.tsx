import { BarChart3 } from "lucide-react";

export function PowerBIEmbedPlaceholder() {
  return (
    <section className="overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted-surface px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Power BI report placeholder</span>
        <div className="flex gap-2">
          <span className="h-2.5 w-20 rounded-full bg-white ring-1 ring-border" />
          <span className="h-2.5 w-14 rounded-full bg-white ring-1 ring-border" />
        </div>
      </div>
      <div className="min-h-[430px] bg-white p-5">
        <div className="mb-5 grid gap-3 sm:grid-cols-4">
          <span className="h-10 rounded-xl bg-blue-soft" />
          <span className="h-10 rounded-xl bg-muted-surface" />
          <span className="h-10 rounded-xl bg-muted-surface" />
          <span className="h-10 rounded-xl bg-muted-surface" />
        </div>
        <div className="grid min-h-[320px] gap-4 lg:grid-cols-[1fr_260px]">
          <div className="rounded-2xl border border-border bg-[linear-gradient(180deg,#f8fbff,#ffffff)] p-5">
            <div className="flex h-full items-center justify-center text-center">
              <div>
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-soft text-brand-blue ring-1 ring-blue-100">
            <BarChart3 size={34} />
                </span>
                <p className="mt-4 text-xl font-semibold text-ink">Embedded sales performance report will appear here.</p>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                  Manager dashboards stay in Power BI. This app provides operational context, navigation, and assistant access around those reports.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-3">
            <span className="rounded-2xl bg-muted-surface" />
            <span className="rounded-2xl bg-muted-surface" />
            <span className="rounded-2xl bg-muted-surface" />
          </div>
        </div>
      </div>
    </section>
  );
}
