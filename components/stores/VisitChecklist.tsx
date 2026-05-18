"use client";

import { useMemo, useState } from "react";
import type { ChecklistItem } from "@/lib/types/domain";

export function VisitChecklist({ items }: { items: ChecklistItem[] }) {
  const [checklist, setChecklist] = useState(items);
  const [notes, setNotes] = useState("");
  const [completed, setCompleted] = useState(false);
  const progress = useMemo(
    () => Math.round((checklist.filter((item) => item.completed).length / checklist.length) * 100),
    [checklist]
  );

  return (
    <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ink">Visit checklist</h2>
          <p className="text-sm text-slate-500">{progress}% complete</p>
        </div>
        {completed ? (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
            Completed
          </span>
        ) : null}
      </div>

      <div className="mt-4 grid gap-2">
        {checklist.map((item) => (
          <label key={item.id} className="flex touch-target items-center gap-3 rounded-xl bg-muted-surface px-3 py-2 text-sm text-slate-700 ring-1 ring-border">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() =>
                setChecklist((current) =>
                  current.map((entry) => (entry.id === item.id ? { ...entry, completed: !entry.completed } : entry))
                )
              }
              className="h-5 w-5 rounded border-slate-300 accent-brand-blue"
            />
            {item.label}
          </label>
        ))}
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-semibold text-slate-700">Visit notes</span>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={4}
          className="mt-2 w-full rounded-xl border border-border bg-white p-3 text-sm outline-none ring-brand-blue/20 focus:ring-4"
          placeholder="Add shelf, promo, stock, competitor, or order notes."
        />
      </label>

      <button
        type="button"
        onClick={() => {
          setChecklist((current) => current.map((item) => ({ ...item, completed: true })));
          setCompleted(true);
        }}
        className="touch-target mt-4 w-full rounded-xl bg-brand-blue px-4 text-sm font-semibold text-white shadow-sm"
      >
        Mark visit as completed
      </button>
    </section>
  );
}
