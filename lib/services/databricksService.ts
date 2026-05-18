import { routes, salesPerformance, stores, users, visitROI, visits } from "@/lib/mock-data/fieldData";
import type { ManagerSummary, RepRouteSummary, SalesPerformance, VisitROI } from "@/lib/types/domain";

/*
Production architecture target:
iPad/iPhone/Desktop -> Next.js PWA -> Backend API -> Databricks SQL Warehouse for analytical data
-> Power BI Embedded for reporting -> PostgreSQL/Supabase for operational app state.

Databricks owns the intelligence layer: store recommendations, sales performance, ROI,
rep performance, promotion ROI, sales trends, and visit completion marts. This MVP simulates
approved curated marts only. Future AI and app APIs should not query raw Databricks tables.

TODO production Databricks integration:
- connect to Databricks SQL Warehouse from the backend API
- query curated marts, not raw bronze/silver tables
- authenticate with a service principal
- apply Unity Catalog permissions and audit policies
*/

export async function getMockUsers() {
  return users;
}

export async function getSalesRepUser() {
  return users.find((user) => user.role === "sales_rep" && user.repId === "rep-1") ?? users[0];
}

export async function getManagerUser() {
  return users.find((user) => user.role === "manager") ?? users[2];
}

export async function queryMartVisitRecommendations(repId?: string) {
  // TODO: Replace with Databricks SQL query against mart_visit_recommendations.
  return stores
    .filter((store) => !repId || store.assignedRepId === repId)
    .sort((a, b) => b.priorityScore - a.priorityScore);
}

export async function queryMartRouteCandidates(repId: string) {
  // TODO: Replace with Databricks SQL query against mart_route_candidates.
  return stores.filter((store) => store.assignedRepId === repId && store.status !== "completed");
}

export async function queryMartStorePerformance(): Promise<SalesPerformance[]>;
export async function queryMartStorePerformance(storeId: string): Promise<SalesPerformance | undefined>;
export async function queryMartStorePerformance(storeId?: string) {
  // TODO: Replace with Databricks SQL query against mart_store_performance and mart_sales_trends.
  return storeId ? salesPerformance.find((item) => item.storeId === storeId) : salesPerformance;
}

export async function queryMartVisitROI(): Promise<VisitROI[]>;
export async function queryMartVisitROI(storeId: string): Promise<VisitROI | undefined>;
export async function queryMartVisitROI(storeId?: string) {
  // TODO: Replace with Databricks SQL query against mart_visit_roi and mart_promo_roi.
  return storeId ? visitROI.find((item) => item.storeId === storeId) : visitROI;
}

export async function getRepRouteSummary(repId: string): Promise<RepRouteSummary> {
  const route = routes.find((item) => item.repId === repId);
  const recommended = stores.filter((store) => store.assignedRepId === repId);
  const repVisits = visits.filter((visit) => visit.repId === repId);
  return {
    recommendedVisits: recommended.length,
    highPriorityStores: recommended.filter((store) => store.priorityScore >= 85).length,
    estimatedDrivingTimeMinutes: route?.stops.reduce((sum, stop) => sum + stop.travelTimeFromPreviousMinutes, 0) ?? 0,
    estimatedDistanceKm: route?.totalDistanceKm ?? 0,
    estimatedSalesOpportunity: recommended.reduce((sum, store) => sum + store.estimatedOpportunity, 0),
    completedVisits: repVisits.filter((visit) => visit.status === "completed").length,
    totalVisits: repVisits.length
  };
}

export async function getManagerSummary(): Promise<ManagerSummary> {
  // TODO: Replace with Databricks SQL queries against mart_rep_performance and mart_visit_completion.
  const planned = visits.length;
  const completed = visits.filter((visit) => visit.status === "completed").length;
  return {
    visitsPlannedToday: planned,
    visitsCompletedToday: completed,
    completionRate: Math.round((completed / planned) * 100),
    totalEstimatedOpportunity: stores.reduce((sum, store) => sum + store.estimatedOpportunity, 0),
    storesNotVisited30Days: stores.filter((store) => new Date(store.lastVisitDate) < new Date("2026-04-18")).length,
    highPriorityStores: stores.filter((store) => store.priorityScore >= 85).length
  };
}

export async function getEmbeddedReportingDatasetPreview() {
  // TODO: Replace with approved reporting marts: mart_rep_performance, mart_promo_roi, mart_visit_completion.
  return {
    regions: ["Alsace", "Strasbourg", "Colmar", "Mulhouse", "Grand Est"],
    lastRefreshedAt: "2026-05-18T07:00:00+02:00"
  };
}
