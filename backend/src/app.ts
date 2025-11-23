import { Hono } from 'hono';
import { logger } from 'hono/logger';

const app = new Hono();

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
