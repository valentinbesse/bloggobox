import { PUBLIC_BACKEND_URL } from '$env/static/public';

/**
 * Effectue un appel HTTP vers le backend Hono.
 *
 * Cette fonction centralise la construction de l’URL, les headers JSON
 * et la gestion des erreurs HTTP, afin d’offrir une interface simple
 * pour les appels API du frontend.
 *
 * @param path - Chemin de l’endpoint backend (ex: "/articles")
 * @param options - Options fetch (méthode, body, headers…)
 *
 * @returns Réponse JSON parsée si la requête réussit.
 * @throws Error si la réponse HTTP n'est pas OK.
 *
 * @example
 * const articles = await api("/articles");
 */
export async function api(path: string, options: RequestInit = {}) {
  const res = await fetch(`${PUBLIC_BACKEND_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(`API ${res.status}: ${message}`);
  }

  // si pas de body JSON (ex: DELETE)
  if (res.status === 204) return null;

  return res.json();
}

/**
 * Effectue un appel GET vers le backend.
 * @param path
 * @returns Réponse JSON parsée si la requête réussit.
 */
export const apiGet = (path: string) => api(path);

/**
 * Effectue un appel POST vers le backend.
 * @param path
 * @returns Réponse JSON parsée si la requête réussit.
 */
export const apiPost = (path: string, body: unknown) =>
  api(path, {
    method: 'POST',
    body: JSON.stringify(body)
  });

/**
 * Effectue un appel PUT vers le backend.
 * @param path
 * @returns Réponse JSON parsée si la requête réussit.
 */
export const apiPut = (path: string, body: unknown) =>
  api(path, {
    method: 'PUT',
    body: JSON.stringify(body)
  });

/**
 * Effectue un appel DELETE vers le backend.
 * @param path
 * @returns Réponse JSON parsée si la requête réussit.
 */
export const apiDelete = (path: string) =>
  api(path, {
    method: 'DELETE'
  });
