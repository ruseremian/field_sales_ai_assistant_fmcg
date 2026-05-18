"use client";

import { useRouter } from "next/navigation";
import { BriefcaseBusiness, MapPinned, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(15,118,110,0.18),transparent_32rem),radial-gradient(circle_at_80%_10%,rgba(37,99,235,0.14),transparent_30rem),linear-gradient(180deg,#ffffff_0%,#f6f7fb_100%)]" />
      <section className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/86 shadow-soft backdrop-blur-xl">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-field">
              <Sparkles size={14} />
              FMCG field execution MVP
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-field to-signal text-white shadow-glow">
                <MapPinned size={26} />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-500">Field Sales AI Assistant</p>
                <h1 className="text-3xl font-semibold tracking-tight text-ink">Plan better field days.</h1>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              AI-powered route planning and field execution for FMCG sales teams.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">Recommended visits</div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">Route execution</div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">Power BI ready</div>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-slate-950 p-6 text-white sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <h2 className="text-xl font-semibold">Choose a workspace</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">Use mock users to enter the role-specific prototype.</p>
            <div className="mt-6 grid gap-3">
              <button
                onClick={() => router.push("/rep")}
                className="touch-target rounded-2xl border border-white/10 bg-white/8 p-5 text-left transition hover:border-emerald-300/60 hover:bg-white/12"
              >
                <MapPinned className="text-emerald-300" size={28} />
                <span className="mt-4 block text-lg font-semibold">Sales Rep</span>
                <span className="mt-2 block text-sm leading-6 text-slate-300">
                  Open today&apos;s route, recommended stores, checklists, notes, and AI guidance.
                </span>
              </button>

              <button
                onClick={() => router.push("/manager")}
                className="touch-target rounded-2xl border border-white/10 bg-white/8 p-5 text-left transition hover:border-blue-300/60 hover:bg-white/12"
              >
                <BriefcaseBusiness className="text-blue-300" size={28} />
                <span className="mt-4 block text-lg font-semibold">Manager</span>
                <span className="mt-2 block text-sm leading-6 text-slate-300">
                  Review execution KPIs, Power BI placeholder, and management assistant prompts.
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
