import { API_CONFIG } from "@/shared/config/api";

type FetchOptions = RequestInit & {
  cache?: RequestCache;
};

class ApiClient {
  constructor(private baseUrl: string = "") {}

  async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const url = this.baseUrl ? `${this.baseUrl}${endpoint}` : endpoint;

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient(API_CONFIG.baseUrl);
