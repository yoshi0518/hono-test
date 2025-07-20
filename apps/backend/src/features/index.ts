import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { v1Router } from './v1';

export const app = new Hono()
  .use(
    '*',
    cors({
      origin: '*',
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
  )
  .basePath('/api')
  .route('/v1', v1Router);

export type AppType = typeof app;
