import { PUBLIC_BACKEND_URL } from '$env/static/public';

export async function api(path: string, options: RequestInit = {}) {
  const res = await fetch(`${PUBLIC_BACKEND_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
