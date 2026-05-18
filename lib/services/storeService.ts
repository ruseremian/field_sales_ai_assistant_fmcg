import { stores } from "@/lib/mock-data/fieldData";
import { queryMartVisitRecommendations } from "@/lib/services/databricksService";

export async function getStores() {
  return stores;
}

export async function getStoreById(storeId: string) {
  return stores.find((store) => store.id === storeId);
}

export async function getRecommendedStoresForRep(repId: string) {
  return queryMartVisitRecommendations(repId);
}
