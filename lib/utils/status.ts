import type { VisitStatus } from "@/lib/types/domain";

export function priorityLabel(score: number) {
  if (score >= 85) return "High";
  if (score >= 70) return "Medium";
  return "Low";
}

export function statusLabel(status: VisitStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function statusClasses(status: VisitStatus) {
  if (status === "completed") return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (status === "skipped") return "bg-amber-50 text-amber-700 ring-amber-200";
  return "bg-blue-soft text-brand-blue ring-blue-200";
}

export function priorityClasses(score: number) {
  if (score >= 85) return "bg-red-50 text-brand-red ring-red-200";
  if (score >= 70) return "bg-amber-50 text-amber-700 ring-amber-200";
  return "bg-blue-soft text-brand-blue ring-blue-200";
}
