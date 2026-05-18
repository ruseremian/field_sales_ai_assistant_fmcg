import Link from "next/link";
import { Bot, ChevronRight, Home, LogOut, MapPinned, MonitorUp, Route, Sparkles, Store } from "lucide-react";
import type { UserRole } from "@/lib/types/domain";

const repItems = [
  { href: "/rep", label: "Home", icon: Home },
  { href: "/rep/visits", label: "Visits", icon: Store },
  { href: "/rep/route", label: "Route", icon: Route },
  { href: "/assistant?role=sales_rep", label: "Assistant", icon: Bot }
];

const managerItems = [
  { href: "/manager", label: "Reporting", icon: MonitorUp },
  { href: "/assistant?role=manager", label: "Assistant", icon: Bot }
];

export function AppShell({
  role,
  title,
  subtitle,
  children
}: {
  role: UserRole;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const navItems = role === "manager" ? managerItems : repItems;

  return (
    <div className="min-h-screen bg-transparent pb-20 lg:pb-0">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200/80 bg-white/88 px-4 py-5 shadow-sm backdrop-blur-xl lg:block">
        <Link href={role === "manager" ? "/manager" : "/rep"} className="flex items-center gap-3 rounded-2xl px-2 py-1">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-field to-signal text-white shadow-glow">
            <MapPinned size={22} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-ink">Field Sales AI</span>
            <span className="block text-xs text-slate-500">FMCG execution</span>
          </span>
        </Link>

        <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50/80 p-2">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {role === "manager" ? "Manager" : "Sales rep"}
          </p>
          <nav className="grid gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="touch-target group inline-flex items-center justify-between rounded-xl px-3 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-ink hover:shadow-sm"
                >
                  <span className="inline-flex items-center gap-3">
                    <Icon size={18} />
                    {item.label}
                  </span>
                  <ChevronRight className="opacity-0 transition group-hover:opacity-100" size={16} />
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute inset-x-4 bottom-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-field">
              <Sparkles size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">Mock MVP mode</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Databricks, Power BI, and AI services are ready as clean placeholders.</p>
            </div>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl lg:ml-72">
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 xl:px-8">
          <Link href={role === "manager" ? "/manager" : "/rep"} className="flex items-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-field to-signal text-white">
              <MapPinned size={20} />
            </span>
            <span className="text-sm font-semibold text-ink">Field Sales AI</span>
          </Link>
          <div className="hidden lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-field">
              {role === "manager" ? "Manager workspace" : "Sales rep workspace"}
            </p>
          </div>
          <Link
            href="/login"
            className="touch-target inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
          >
            <LogOut size={16} />
            Login
          </Link>
        </div>
      </header>

      <main className="px-4 py-6 sm:px-6 lg:ml-72 xl:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-field lg:hidden">
              {role === "manager" ? "Manager workspace" : "Sales rep workspace"}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
            {subtitle ? <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{subtitle}</p> : null}
          </div>
          {children}
        </div>
      </main>

      <nav className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-slate-200 bg-white/92 p-2 shadow-soft backdrop-blur-xl lg:hidden">
        <div className={`grid gap-1 ${navItems.length === 2 ? "grid-cols-2" : "grid-cols-4"}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="touch-target inline-flex flex-col items-center justify-center gap-1 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-ink"
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
      </div>
  );
}
