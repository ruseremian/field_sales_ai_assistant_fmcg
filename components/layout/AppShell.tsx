import Link from "next/link";
import { Bot, ChevronRight, Home, LogOut, MapPinned, MonitorUp, Route, ShieldCheck, Store, UserRound } from "lucide-react";
import type { UserRole } from "@/lib/types/domain";
import { InternalToolBadge } from "@/components/ui/InternalToolBadge";

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
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-border bg-white px-4 py-5 shadow-sm lg:block">
        <Link href={role === "manager" ? "/manager" : "/rep"} className="flex items-center gap-3 rounded-2xl px-2 py-1">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-blue text-white shadow-sm">
            <MapPinned size={22} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-ink">Field Sales AI</span>
            <span className="block text-xs text-muted-foreground">Internal Sales Tool</span>
          </span>
        </Link>

        <div className="mt-5 px-2">
          <InternalToolBadge />
        </div>

        <div className="mt-5 rounded-2xl border border-border bg-muted-surface p-2">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {role === "manager" ? "Manager" : "Sales rep"}
          </p>
          <nav className="grid gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="touch-target group inline-flex items-center justify-between rounded-xl px-3 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-brand-blue hover:shadow-sm"
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

        <div className="absolute inset-x-4 bottom-5 rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-soft text-brand-blue">
              <ShieldCheck size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">Mock MVP mode</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">Databricks, Power BI, and AI services are clean placeholders.</p>
            </div>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-20 border-b border-border bg-white/95 backdrop-blur lg:ml-72">
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 xl:px-8">
          <Link href={role === "manager" ? "/manager" : "/rep"} className="flex items-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-blue text-white">
              <MapPinned size={20} />
            </span>
            <span className="text-sm font-semibold text-ink">Field Sales AI</span>
          </Link>
          <div className="hidden lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
              {role === "manager" ? "Manager workspace" : "Sales rep workspace"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-xl border border-border bg-muted-surface px-3 py-2 text-sm font-semibold text-slate-700 sm:inline-flex">
              <UserRound size={16} />
              {role === "manager" ? "Sophie Laurent" : "Camille Meyer"}
            </span>
            <Link
              href="/login"
              className="touch-target inline-flex items-center gap-2 rounded-xl border border-border bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-blue"
            >
              <LogOut size={16} />
              Login
            </Link>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 sm:px-6 lg:ml-72 xl:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue lg:hidden">
              {role === "manager" ? "Manager workspace" : "Sales rep workspace"}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
            {subtitle ? <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{subtitle}</p> : null}
          </div>
          {children}
        </div>
      </main>

      <nav className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-border bg-white/95 p-2 shadow-soft backdrop-blur lg:hidden">
        <div className={`grid gap-1 ${navItems.length === 2 ? "grid-cols-2" : "grid-cols-4"}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="touch-target inline-flex flex-col items-center justify-center gap-1 rounded-xl text-xs font-semibold text-slate-600 hover:bg-blue-soft hover:text-brand-blue"
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
