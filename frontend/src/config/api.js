const configuredApiUrl = process.env.REACT_APP_API_URL || "http://localhost:3008";

export const API_URL = configuredApiUrl.replace(/\/$/, "");

const configuredDashboardUrl =
  process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

export const DASHBOARD_URL = configuredDashboardUrl.replace(/\/$/, "");
