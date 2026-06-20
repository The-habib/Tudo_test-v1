const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type FetchOptions = Omit<RequestInit, "body"> & { body?: unknown };

export async function apiFetch(
  path: string,
  getToken: () => Promise<string | null>,
  options: FetchOptions = {}
) {
  const token = await getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}/api${path}`, {
    ...options,
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || "Request failed");
  }

  if (res.status === 204) return null;
  return res.json();
}
