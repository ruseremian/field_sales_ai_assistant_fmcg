"use client";

import { useRouter } from "next/navigation";
import { BriefcaseBusiness, MapPinned, ShieldCheck } from "lucide-react";
import { InternalToolBadge } from "@/components/ui/InternalToolBadge";

export function LoginScreen() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-app px-4 py-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(0,77,153,0.12),transparent_30rem),radial-gradient(circle_at_80%_12%,rgba(210,38,48,0.06),transparent_24rem)]" />
      <div className="absolute left-0 top-0 -z-10 h-full w-1/2 bg-white/60" />

      <section className="w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-white shadow-corporate">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-b border-border bg-muted-surface p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
            <InternalToolBadge label="Dr. Oetker Internal Tool" />
            <div className="mt-7 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue text-white shadow-sm">
                <MapPinned size={28} />
              </span>
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Field Sales AI Assistant</p>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">Sales execution, ready for the field.</h1>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
              Internal sales execution and route intelligence platform for FMCG field teams.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">Recommended visits</div>
              <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">Route planning</div>
              <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">Power BI reporting</div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 lg:p-10">
            <div className="flex items-start gap-3 rounded-2xl bg-blue-soft p-4">
              <ShieldCheck className="mt-0.5 text-brand-blue" size={22} />
              <div>
                <h2 className="text-lg font-semibold text-foreground">Choose your workspace</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">Mock access for the first internal prototype.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <button
                onClick={() => router.push("/rep")}
                className="touch-target rounded-2xl border border-border bg-white p-5 text-left shadow-sm transition hover:border-brand-blue hover:bg-blue-soft"
              >
                <MapPinned className="text-brand-blue" size={28} />
                <span className="mt-4 block text-lg font-semibold text-foreground">Sales Rep</span>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                  Open today&apos;s route, recommended stores, visit checklists, notes, and assistant guidance.
                </span>
              </button>

              <button
                onClick={() => router.push("/manager")}
                className="touch-target rounded-2xl border border-border bg-white p-5 text-left shadow-sm transition hover:border-brand-blue hover:bg-blue-soft"
              >
                <BriefcaseBusiness className="text-brand-blue" size={28} />
                <span className="mt-4 block text-lg font-semibold text-foreground">Manager</span>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                  Review execution KPIs, Power BI report placeholders, and management assistant prompts.
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
