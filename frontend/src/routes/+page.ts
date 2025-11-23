import { apiGet } from '$lib/api/client';

export async function load() {
  const articles = await apiGet('/articles');
  return { articles };
}
