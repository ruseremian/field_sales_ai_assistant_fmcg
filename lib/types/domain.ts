export type UserRole = "sales_rep" | "manager";
export type VisitStatus = "planned" | "completed" | "skipped";
export type RouteStatus = "draft" | "optimized" | "in_progress" | "completed";
export type ConfidenceLevel = "low" | "medium" | "high";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  regionId: string;
  repId?: string;
};

export type Store = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  banner: string;
  region: string;
  assignedRepId: string;
  priorityScore: number;
  estimatedOpportunity: number;
  lastVisitDate: string;
  recommendationReasons: string[];
  status: VisitStatus;
};

export type ChecklistItem = {
  id: string;
  label: string;
  completed: boolean;
};

export type Visit = {
  id: string;
  storeId: string;
  repId: string;
  plannedDate: string;
  completedDate?: string;
  status: VisitStatus;
  notes?: string;
  checklist: ChecklistItem[];
};

export type RouteStop = {
  id: string;
  storeId: string;
  stopOrder: number;
  estimatedArrival: string;
  estimatedVisitDurationMinutes: number;
  travelTimeFromPreviousMinutes: number;
  priorityScore: number;
};

export type Route = {
  id: string;
  repId: string;
  date: string;
  stops: RouteStop[];
  totalDistanceKm: number;
  totalDurationMinutes: number;
  totalEstimatedOpportunity: number;
  status: RouteStatus;
};

export type SalesPerformance = {
  storeId: string;
  revenueLast4Weeks: number;
  revenuePrevious4Weeks: number;
  revenueChangePercent: number;
  volumeChangePercent: number;
  marginChangePercent: number;
};

export type VisitROI = {
  storeId: string;
  lastVisitDate: string;
  salesBeforeVisit: number;
  salesAfterVisit: number;
  upliftRevenue: number;
  upliftMargin: number;
  roiScore: number;
  confidenceLevel: ConfidenceLevel;
};

export type ManagerSummary = {
  visitsPlannedToday: number;
  visitsCompletedToday: number;
  completionRate: number;
  totalEstimatedOpportunity: number;
  storesNotVisited30Days: number;
  highPriorityStores: number;
};

export type RepRouteSummary = {
  recommendedVisits: number;
  highPriorityStores: number;
  estimatedDrivingTimeMinutes: number;
  estimatedDistanceKm: number;
  estimatedSalesOpportunity: number;
  completedVisits: number;
  totalVisits: number;
};

export type AssistantMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};
