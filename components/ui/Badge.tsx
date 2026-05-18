import { priorityClasses, priorityLabel, statusClasses, statusLabel } from "@/lib/utils/status";
import type { VisitStatus } from "@/lib/types/domain";

export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${className}`}>
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: VisitStatus }) {
  return <Badge className={statusClasses(status)}>{statusLabel(status)}</Badge>;
}

export function PriorityBadge({ score }: { score: number }) {
  return <Badge className={priorityClasses(score)}>{priorityLabel(score)} priority</Badge>;
}
