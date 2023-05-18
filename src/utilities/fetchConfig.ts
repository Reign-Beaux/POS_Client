export interface ApiConfig {
  API_URL: string;
}

export const fetchConfig = async (): Promise<ApiConfig> => {
  const response = await fetch("/config.json");
  return await response.json();
};