import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';

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

// Articles mock
app.get('/articles', (c) =>
  c.json([
    { id: 1, title: 'Premier article', content: 'Contenu de test' },
    { id: 2, title: 'Deuxième article', content: 'Encore du contenu' }
  ])
);

export default app;
