import { API_CONFIG } from "@/shared/config/api";
// shared/lib/api-client.ts
type FetchOptions = RequestInit & { cache?: RequestCache };

const isServer = typeof window === "undefined";

function resolveBaseUrl(explicit?: string) {
  if (explicit) return explicit; // если передан в API_CONFIG
  if (!isServer) return ""; // клиент: относительный путь ок
  // сервер: нужен абсолютный
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  const port = process.env.PORT ?? 3000;
  return `http://localhost:${port}`;
}

function buildUrl(endpoint: string, baseUrl?: string) {
  // Уже абсолютный?
  if (/^https?:\/\//i.test(endpoint)) return endpoint;

  // Клиент: оставляем относительный
  if (!isServer) return endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  // Сервер: собираем абсолютный корректно
  const base = resolveBaseUrl(baseUrl);
  return new URL(endpoint, base).toString(); // избежит двойных слэшей
}

class ApiClient {
  constructor(private baseUrl?: string) {}

  async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const url = buildUrl(endpoint, this.baseUrl);

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(
        `API ${response.status} ${response.statusText} for ${url}${
          text ? `: ${text}` : ""
        }`,
      );
    }

    return response.json() as Promise<T>;
  }
}

export const apiClient = new ApiClient(API_CONFIG.baseUrl);
