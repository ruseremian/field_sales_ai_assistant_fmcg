import { visits } from "@/lib/mock-data/fieldData";
import type { Visit } from "@/lib/types/domain";

/*
Operational state boundary:
For the MVP, visit status, checklist completion, and notes are mock/local state. In production,
this belongs in PostgreSQL/Supabase as app operational state, then can be synchronized or
modeled back into Databricks for analytics.
*/

export async function getVisitsForRep(repId: string) {
  return visits.filter((visit) => visit.repId === repId);
}

export async function getVisitForStore(storeId: string) {
  return visits.find((visit) => visit.storeId === storeId);
}

export async function markVisitCompleted(storeId: string, notes: string): Promise<Visit | undefined> {
  // TODO: Persist to operational database and emit event for Databricks ingestion.
  const visit = visits.find((item) => item.storeId === storeId);
  if (!visit) return undefined;
  return {
    ...visit,
    status: "completed",
    completedDate: "2026-05-18",
    notes,
    checklist: visit.checklist.map((item) => ({ ...item, completed: true }))
  };
}
