import { serve } from '@hono/node-server';
import app from './app';
import 'dotenv/config';

const port = Number(process.env.PORT) || 3001;
console.log(`Backend Hono running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});
