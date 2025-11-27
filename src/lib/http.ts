import { GIPHY_API_BASE, GIPHY_API_KEY } from "./constants";

// Class HTTP error
export class HttpError extends Error {
  constructor(
    public status: number,
    message?: string,
  ) {
    super(message || `HTTP ${status}`);
  }
}

// Wrapper Http
export async function http<T = unknown>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const url = `${GIPHY_API_BASE}${path}${path.includes("?") ? "&" : "?"}api_key=${GIPHY_API_KEY}`;

  const res = await fetch(url, { cache: "no-store", ...init });

  if (!res.ok) {
    throw new HttpError(
      res.status,
      `Request failed: ${res.status} ${res.statusText}`,
    );
  }

  return res.json() as Promise<T>;
}
