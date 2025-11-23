import 'dotenv/config';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { db } from './lib/db/drizzle';
import { articles } from './lib/db/schema';

const app = new Hono();

// autorise le frontend (5173)
app.use('*', cors({
  origin: 'http://localhost:5173',
  allowHeaders: ['Content-Type'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use('*', logger());

// Route santé
app.get('/health', (c) => c.json({ status: 'ok' }));

/**
 * Récupère la liste des articles.
 * @return Liste des articles.
 */
app.get('/articles', async (c) => {
  const list = await db.select().from(articles);
  return c.json(list);
});

export default app;
