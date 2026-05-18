import { getManagerSummary, getRepRouteSummary, queryMartVisitRecommendations } from "@/lib/services/databricksService";
import { formatCurrency } from "@/lib/utils/format";

/*
Future AI assistant architecture:
OpenAI API -> backend assistant service -> approved Databricks curated marts and semantic metrics.
The assistant must not freely query raw Databricks tables. Use controlled marts such as
mart_route_candidates, mart_visit_recommendations, mart_store_performance, mart_visit_roi,
mart_rep_performance, mart_promo_roi, mart_sales_trends, and mart_visit_completion with
role-based data access and validated metric definitions.

TODO production assistant integration:
- OpenAI API for responses and tool calling
- Databricks SQL queries through backend services
- controlled semantic layer
- approved metrics only
- role-based data access
*/

export const suggestedQuestions = [
  "Which stores should I visit this week?",
  "Why is this store recommended?",
  "Why did sales drop in my sector?",
  "Which stores have not been visited recently?",
  "Which visits generated the best uplift?",
  "What are the top opportunities in my region?",
  "Which customers should I prioritize tomorrow?",
  "Which reps have low visit completion?"
];

export async function getMockAssistantAnswer(question: string, role: "sales_rep" | "manager" = "sales_rep") {
  const normalized = question.toLowerCase();

  // TODO: Replace with OpenAI API calls grounded in Databricks SQL Warehouse results.
  // TODO: Enforce role-based data access before retrieving curated Databricks mart rows.
  // TODO: Use a controlled semantic layer for safe predefined metrics and explanations.

  if (role === "manager" || normalized.includes("rep")) {
    const summary = await getManagerSummary();
    return `Today there are ${summary.visitsPlannedToday} planned visits and ${summary.visitsCompletedToday} completed visits, for a ${summary.completionRate}% completion rate. Focus coaching on high-priority stores and stores not visited in 30+ days before adding new route volume.`;
  }

  const recommendations = await queryMartVisitRecommendations("rep-1");
  const topStores = recommendations.slice(0, 3).map((store) => store.name).join(", ");
  const routeSummary = await getRepRouteSummary("rep-1");

  if (normalized.includes("why")) {
    const store = recommendations[0];
    return `${store.name} is recommended because ${store.recommendationReasons.join(", ").toLowerCase()}. The estimated opportunity is ${formatCurrency(store.estimatedOpportunity)} with a priority score of ${store.priorityScore}.`;
  }

  if (normalized.includes("opportunit") || normalized.includes("prioritize")) {
    return `The strongest opportunities are ${topStores}. Your recommended universe represents ${formatCurrency(routeSummary.estimatedSalesOpportunity)} in estimated opportunity, with ${routeSummary.highPriorityStores} high-priority stores.`;
  }

  if (normalized.includes("not been visited") || normalized.includes("recently")) {
    const neglected = recommendations.filter((store) => new Date(store.lastVisitDate) < new Date("2026-04-18"));
    return `${neglected.length} stores in your area have not been visited in more than 30 days. Start with ${neglected.slice(0, 3).map((store) => store.name).join(", ")}.`;
  }

  return `For today, start with ${topStores}. The route balances priority score, opportunity size, recent visit gaps, and promotion execution risk.`;
}
