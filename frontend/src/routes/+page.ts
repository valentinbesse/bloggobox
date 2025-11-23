import { api } from '$lib/api/client';

export async function load() {
  const articles = await api('/articles', {
     method: 'GET' 
    });
  return { articles };
}
