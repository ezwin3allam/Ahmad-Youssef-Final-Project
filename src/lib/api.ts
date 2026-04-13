export function getApiBaseUrl() {
  const url = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
  if (!url) {
    throw new Error("Missing API base URL. Set API_BASE_URL.");
  }
  return url;
}

export function getAppBaseUrl() {
  const url = process.env.NEXTAUTH_URL;
  if (!url) {
    throw new Error("Missing NEXTAUTH_URL.");
  }
  return url;
}

export async function parseJsonSafe<T>(res: Response): Promise<T | null> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

export async function fetchJsonOrThrow<T>(
  input: string,
  init?: RequestInit
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  const res = await fetch(input, { signal: controller.signal, ...init }).finally(() => clearTimeout(timeout));
  const payload = await parseJsonSafe<T & { message?: string }>(res);

  if (!res.ok) {
    const message =
      payload && typeof payload === "object" && "message" in payload
        ? String(payload.message)
        : `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  if (payload === null) {
    throw new Error("Invalid response payload from API.");
  }

  return payload;
}
