import { AppShell } from "@/components/layout/AppShell";
import { SectionCard } from "@/components/ui/SectionCard";
import { StoreCard } from "@/components/visits/StoreCard";
import { getSalesRepUser } from "@/lib/services/databricksService";
import { getRecommendedStoresForRep } from "@/lib/services/storeService";

export default async function RecommendedVisitsPage() {
  const user = await getSalesRepUser();
  const stores = await getRecommendedStoresForRep(user.repId ?? "rep-1");

  return (
    <AppShell
      role="sales_rep"
      title="Recommended visits"
      subtitle="Recommendations simulate Databricks curated marts for route candidates, sales trends, promotion risk, and visit gaps."
    >
      <SectionCard title="Prioritized store list" eyebrow={`${stores.length} recommendations`}>
        <div className="grid gap-4">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}
