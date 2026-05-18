import type {
  ChecklistItem,
  Route,
  SalesPerformance,
  Store,
  User,
  Visit,
  VisitROI
} from "@/lib/types/domain";

const checklist = (): ChecklistItem[] => [
  { id: "shelf", label: "Check shelf presence", completed: false },
  { id: "price", label: "Check price", completed: false },
  { id: "promo", label: "Check promotion execution", completed: false },
  { id: "competitor", label: "Check competitor activity", completed: false },
  { id: "stock", label: "Check stock availability", completed: false },
  { id: "order", label: "Discuss order opportunity", completed: false },
  { id: "notes", label: "Add visit notes", completed: false }
];

export const users: User[] = [
  {
    id: "user-rep-1",
    name: "Camille Meyer",
    email: "camille.meyer@example.com",
    role: "sales_rep",
    regionId: "alsace",
    repId: "rep-1"
  },
  {
    id: "user-rep-2",
    name: "Nicolas Fischer",
    email: "nicolas.fischer@example.com",
    role: "sales_rep",
    regionId: "grand-est",
    repId: "rep-2"
  },
  {
    id: "user-manager-1",
    name: "Sophie Laurent",
    email: "sophie.laurent@example.com",
    role: "manager",
    regionId: "grand-est"
  }
];

export const stores: Store[] = [
  {
    id: "store-001",
    name: "Carrefour Strasbourg Etoile",
    address: "12 Route de Vienne, 67100 Strasbourg",
    latitude: 48.5682,
    longitude: 7.7549,
    banner: "Carrefour",
    region: "Strasbourg",
    assignedRepId: "rep-1",
    priorityScore: 94,
    estimatedOpportunity: 12800,
    lastVisitDate: "2026-04-01",
    recommendationReasons: [
      "Sales dropped by 18% over the last 4 weeks",
      "Promotion opportunity this week",
      "Underperforming compared to similar stores"
    ],
    status: "planned"
  },
  {
    id: "store-002",
    name: "Auchan Illkirch",
    address: "6 Avenue de Strasbourg, 67400 Illkirch-Graffenstaden",
    latitude: 48.5292,
    longitude: 7.7158,
    banner: "Auchan",
    region: "Strasbourg",
    assignedRepId: "rep-1",
    priorityScore: 88,
    estimatedOpportunity: 9800,
    lastVisitDate: "2026-03-26",
    recommendationReasons: ["No visit in 53 days", "High potential customer", "Stock availability risk"],
    status: "planned"
  },
  {
    id: "store-003",
    name: "Leclerc Schiltigheim",
    address: "90 Route de Bischwiller, 67300 Schiltigheim",
    latitude: 48.607,
    longitude: 7.749,
    banner: "Leclerc",
    region: "Strasbourg",
    assignedRepId: "rep-1",
    priorityScore: 81,
    estimatedOpportunity: 7200,
    lastVisitDate: "2026-04-16",
    recommendationReasons: ["High margin category opportunity", "Promotion compliance to verify"],
    status: "completed"
  },
  {
    id: "store-004",
    name: "Monoprix Strasbourg Centre",
    address: "3 Rue du Noyer, 67000 Strasbourg",
    latitude: 48.5833,
    longitude: 7.7477,
    banner: "Monoprix",
    region: "Strasbourg",
    assignedRepId: "rep-1",
    priorityScore: 76,
    estimatedOpportunity: 6100,
    lastVisitDate: "2026-04-10",
    recommendationReasons: ["Premium assortment opportunity", "Competitor activity reported nearby"],
    status: "planned"
  },
  {
    id: "store-005",
    name: "Intermarche Lingolsheim",
    address: "2 Rue de la Faisanderie, 67380 Lingolsheim",
    latitude: 48.557,
    longitude: 7.681,
    banner: "Intermarche",
    region: "Strasbourg",
    assignedRepId: "rep-1",
    priorityScore: 72,
    estimatedOpportunity: 5400,
    lastVisitDate: "2026-03-31",
    recommendationReasons: ["No visit in 48 days", "Order opportunity in beverage category"],
    status: "planned"
  },
  {
    id: "store-006",
    name: "Super U Obernai",
    address: "18 Rue du General Gouraud, 67210 Obernai",
    latitude: 48.463,
    longitude: 7.481,
    banner: "Super U",
    region: "Alsace",
    assignedRepId: "rep-1",
    priorityScore: 68,
    estimatedOpportunity: 4700,
    lastVisitDate: "2026-05-02",
    recommendationReasons: ["New promotion setup required", "Store manager requested follow-up"],
    status: "skipped"
  },
  {
    id: "store-007",
    name: "Cora Haguenau",
    address: "Route du Rhin, 67500 Haguenau",
    latitude: 48.817,
    longitude: 7.79,
    banner: "Cora",
    region: "Alsace",
    assignedRepId: "rep-1",
    priorityScore: 84,
    estimatedOpportunity: 8900,
    lastVisitDate: "2026-03-20",
    recommendationReasons: ["No visit in 59 days", "High potential customer"],
    status: "planned"
  },
  {
    id: "store-008",
    name: "Leclerc Erstein",
    address: "45 Rue du Printemps, 67150 Erstein",
    latitude: 48.423,
    longitude: 7.663,
    banner: "Leclerc",
    region: "Alsace",
    assignedRepId: "rep-1",
    priorityScore: 64,
    estimatedOpportunity: 3900,
    lastVisitDate: "2026-04-28",
    recommendationReasons: ["Assortment gap in core SKU range"],
    status: "planned"
  },
  {
    id: "store-009",
    name: "Carrefour Colmar Nord",
    address: "18 Route de Strasbourg, 68000 Colmar",
    latitude: 48.093,
    longitude: 7.361,
    banner: "Carrefour",
    region: "Colmar",
    assignedRepId: "rep-2",
    priorityScore: 91,
    estimatedOpportunity: 11600,
    lastVisitDate: "2026-03-29",
    recommendationReasons: ["Sales dropped by 21% over the last 4 weeks", "High potential customer"],
    status: "planned"
  },
  {
    id: "store-010",
    name: "Auchan Colmar",
    address: "5 Rue du Ladhof, 68000 Colmar",
    latitude: 48.085,
    longitude: 7.366,
    banner: "Auchan",
    region: "Colmar",
    assignedRepId: "rep-2",
    priorityScore: 78,
    estimatedOpportunity: 6900,
    lastVisitDate: "2026-04-08",
    recommendationReasons: ["Promotion opportunity this week", "Shelf share below target"],
    status: "completed"
  },
  {
    id: "store-011",
    name: "Super U Wintzenheim",
    address: "22 Route de Colmar, 68920 Wintzenheim",
    latitude: 48.072,
    longitude: 7.292,
    banner: "Super U",
    region: "Colmar",
    assignedRepId: "rep-2",
    priorityScore: 73,
    estimatedOpportunity: 5200,
    lastVisitDate: "2026-03-18",
    recommendationReasons: ["No visit in 61 days", "Order opportunity in snacks category"],
    status: "planned"
  },
  {
    id: "store-012",
    name: "Intermarche Selestat",
    address: "1 Avenue Louis Pasteur, 67600 Selestat",
    latitude: 48.258,
    longitude: 7.45,
    banner: "Intermarche",
    region: "Alsace",
    assignedRepId: "rep-2",
    priorityScore: 69,
    estimatedOpportunity: 4300,
    lastVisitDate: "2026-04-21",
    recommendationReasons: ["Competitor display observed", "Price compliance to verify"],
    status: "planned"
  },
  {
    id: "store-013",
    name: "Cora Mulhouse Dornach",
    address: "258 Rue de Belfort, 68200 Mulhouse",
    latitude: 47.742,
    longitude: 7.3,
    banner: "Cora",
    region: "Mulhouse",
    assignedRepId: "rep-2",
    priorityScore: 86,
    estimatedOpportunity: 9300,
    lastVisitDate: "2026-04-03",
    recommendationReasons: ["Sales dropped by 16% over the last 4 weeks", "High margin category opportunity"],
    status: "planned"
  },
  {
    id: "store-014",
    name: "Leclerc Mulhouse",
    address: "7 Rue Gay Lussac, 68100 Mulhouse",
    latitude: 47.75,
    longitude: 7.34,
    banner: "Leclerc",
    region: "Mulhouse",
    assignedRepId: "rep-2",
    priorityScore: 83,
    estimatedOpportunity: 8400,
    lastVisitDate: "2026-03-25",
    recommendationReasons: ["No visit in 54 days", "Promotion compliance to verify"],
    status: "planned"
  },
  {
    id: "store-015",
    name: "Monoprix Mulhouse Centre",
    address: "21 Rue du Sauvage, 68100 Mulhouse",
    latitude: 47.747,
    longitude: 7.339,
    banner: "Monoprix",
    region: "Mulhouse",
    assignedRepId: "rep-2",
    priorityScore: 71,
    estimatedOpportunity: 5100,
    lastVisitDate: "2026-05-05",
    recommendationReasons: ["Premium assortment opportunity"],
    status: "skipped"
  },
  {
    id: "store-016",
    name: "Carrefour Market Rixheim",
    address: "64 Rue de l'Ile Napoleon, 68170 Rixheim",
    latitude: 47.753,
    longitude: 7.405,
    banner: "Carrefour",
    region: "Mulhouse",
    assignedRepId: "rep-2",
    priorityScore: 67,
    estimatedOpportunity: 4500,
    lastVisitDate: "2026-04-27",
    recommendationReasons: ["Underperforming compared to similar stores"],
    status: "planned"
  }
];

export const visits: Visit[] = stores.map((store, index) => ({
  id: `visit-${store.id}`,
  storeId: store.id,
  repId: store.assignedRepId,
  plannedDate: "2026-05-18",
  completedDate: store.status === "completed" ? "2026-05-18" : undefined,
  status: store.status,
  notes: store.status === "completed" ? "Checked core assortment and confirmed promo setup." : undefined,
  checklist: checklist().map((item, itemIndex) => ({
    ...item,
    completed: store.status === "completed" || (index + itemIndex) % 5 === 0
  }))
}));

export const routes: Route[] = [
  {
    id: "route-rep-1-today",
    repId: "rep-1",
    date: "2026-05-18",
    stops: ["store-001", "store-004", "store-003", "store-002", "store-005"].map((storeId, index) => ({
      id: `route-stop-rep-1-${index + 1}`,
      storeId,
      stopOrder: index + 1,
      estimatedArrival: ["08:45", "09:45", "10:50", "12:00", "14:15"][index],
      estimatedVisitDurationMinutes: [45, 40, 45, 50, 40][index],
      travelTimeFromPreviousMinutes: [0, 14, 18, 22, 16][index],
      priorityScore: stores.find((store) => store.id === storeId)?.priorityScore ?? 0
    })),
    totalDistanceKm: 42,
    totalDurationMinutes: 345,
    totalEstimatedOpportunity: 41300,
    status: "optimized"
  },
  {
    id: "route-rep-2-today",
    repId: "rep-2",
    date: "2026-05-18",
    stops: ["store-009", "store-010", "store-011", "store-013", "store-014"].map((storeId, index) => ({
      id: `route-stop-rep-2-${index + 1}`,
      storeId,
      stopOrder: index + 1,
      estimatedArrival: ["08:30", "09:30", "10:35", "13:20", "14:25"][index],
      estimatedVisitDurationMinutes: [50, 45, 40, 50, 45][index],
      travelTimeFromPreviousMinutes: [0, 10, 18, 52, 12][index],
      priorityScore: stores.find((store) => store.id === storeId)?.priorityScore ?? 0
    })),
    totalDistanceKm: 88,
    totalDurationMinutes: 410,
    totalEstimatedOpportunity: 41400,
    status: "optimized"
  }
];

export const salesPerformance: SalesPerformance[] = stores.map((store, index) => {
  const previous = 18500 + index * 900;
  const change = [-18, -7, 4, -5, 9, 3, -11, 6, -21, 8, -4, 2, -16, -9, 5, -6][index];
  return {
    storeId: store.id,
    revenueLast4Weeks: Math.round(previous * (1 + change / 100)),
    revenuePrevious4Weeks: previous,
    revenueChangePercent: change,
    volumeChangePercent: change - 2,
    marginChangePercent: change + 1
  };
});

export const visitROI: VisitROI[] = stores.map((store, index) => ({
  storeId: store.id,
  lastVisitDate: store.lastVisitDate,
  salesBeforeVisit: 14200 + index * 650,
  salesAfterVisit: 15600 + index * 720,
  upliftRevenue: 1400 + index * 120,
  upliftMargin: 360 + index * 44,
  roiScore: Math.min(96, 58 + index * 3),
  confidenceLevel: index % 3 === 0 ? "high" : index % 3 === 1 ? "medium" : "low"
}));
