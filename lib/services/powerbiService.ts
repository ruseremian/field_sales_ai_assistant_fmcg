/*
Power BI is the reporting layer. This app should embed reports and provide operational
workflows around visits and routes. It should not become a custom BI/dashboard builder.
*/

export type PowerBIEmbedConfig = {
  workspaceId: string;
  reportId: string;
  datasetId: string;
  embedUrl: string;
  mode: "placeholder";
};

export async function getPowerBIEmbedConfig(): Promise<PowerBIEmbedConfig> {
  return {
    // TODO: Load workspaceId from environment variables.
    workspaceId: "future-powerbi-workspace-id",
    // TODO: Load reportId from environment variables.
    reportId: "future-field-execution-report-id",
    // TODO: Load datasetId from environment variables.
    datasetId: "future-databricks-backed-dataset-id",
    // TODO: Load embedUrl from Power BI REST API metadata.
    embedUrl: "https://app.powerbi.com/reportEmbed",
    // TODO: Embed report in the manager reporting page using the Power BI JavaScript SDK.
    // TODO: Generate embed token from the backend, never directly from the browser.
    // TODO: Handle workspaceId, reportId, datasetId, row-level security, and app-user to Power BI identity mapping.
    mode: "placeholder"
  };
}

export async function getPowerBIEmbeddingTodoList() {
  return [
    "Implement access token and embed token generation",
    "Choose embed for organization vs embed for customers",
    "Apply row-level security for sales reps and managers",
    "Map app users to Power BI identities",
    "Load workspace, report, dataset, and embed URL config from environment variables"
  ];
}
